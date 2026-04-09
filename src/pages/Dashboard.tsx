import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { ImageUploader } from "@/components/ImageUploader";
import { ClassificationResult } from "@/components/ClassificationResult";
import { MonumentExamples } from "@/components/MonumentExamples";
import { Button } from "@/components/ui/button";
import { Landmark, Cpu, Layers, Zap } from "lucide-react";
import { toast } from "sonner";

interface ClassificationData {
  class: string;
  confidence: number;
  location?: string;
  description?: string;
  style?: string;
  era?: string;
}

const Dashboard = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = useCallback((base64: string, previewUrl: string) => {
    setImageBase64(base64);
    setPreview(previewUrl);
    setResult(null);
  }, []);

  const handleClear = useCallback(() => {
    setImageBase64(null);
    setPreview(null);
    setResult(null);
  }, []);

  const handleClassify = async () => {
    if (!imageBase64) return;
    setIsProcessing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("classify-monument", {
        body: { imageBase64 },
      });

      if (error) throw new Error(error.message || "Classification failed");
      if (data?.error) { toast.error(data.error); return; }

      setResult(data);

      // Save to history
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("classifications").insert({
          user_id: user.id,
          monument_name: data.class,
          confidence: data.confidence,
          location: data.location || null,
          description: data.description || null,
          style: data.style || null,
          era: data.era || null,
          image_url: preview,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to classify monument");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* How it works */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: Layers, label: "Upload Image", desc: "JPG, PNG or WebP" },
            { icon: Cpu, label: "CNN Processing", desc: "224×224 normalized" },
            { icon: Zap, label: "Get Result", desc: "Monument classified" },
          ].map((step, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-body font-semibold text-sm text-foreground">{step.label}</p>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ImageUploader
              onImageSelect={handleImageSelect}
              preview={preview}
              onClear={handleClear}
              isProcessing={isProcessing}
            />
            <Button
              onClick={handleClassify}
              disabled={!imageBase64 || isProcessing}
              className="w-full h-12 font-body font-semibold text-base"
              size="lg"
            >
              {isProcessing ? "Classifying..." : "Classify Monument"}
            </Button>
            <MonumentExamples />
          </div>

          <div>
            {result ? (
              <ClassificationResult result={result} />
            ) : (
              <div className="h-full flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8">
                <div className="text-center">
                  <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-body font-medium text-muted-foreground">
                    Classification results will appear here
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Upload an image and click classify
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground/60 font-body">
            Powered by CNN / MobileNetV2 architecture · Image preprocessing at 224×224 · Transfer Learning
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
