import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "@/components/ImageUploader";
import { ClassificationResult } from "@/components/ClassificationResult";
import { MonumentExamples } from "@/components/MonumentExamples";
import { Button } from "@/components/ui/button";
import { Landmark, Cpu, Layers, Zap, LogOut } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-monuments.jpg";

interface ClassificationData {
  class: string;
  confidence: number;
  location?: string;
  description?: string;
  style?: string;
  era?: string;
}

const Index = () => {
  const navigate = useNavigate();
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

      if (error) {
        throw new Error(error.message || "Classification failed");
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setResult(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to classify monument");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Hero header */}
      <header className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Landmark className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
              Heritage Monument Classifier
            </h1>
            <p className="text-xs text-muted-foreground">
              AI-powered monument identification system
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-muted-foreground"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/auth");
            }}
          >
            <LogOut className="w-4 h-4 mr-1" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <img src={heroImage} alt="Heritage monuments illustration" width={1280} height={640} className="w-full h-48 sm:h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent flex items-end p-6 sm:p-8">
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-primary-foreground mb-2">
                Identify Any Heritage Monument
              </h2>
              <p className="text-primary-foreground/80 font-body max-w-xl text-sm sm:text-base">
                Upload a photo and our CNN-based model will classify it with details about history, location, and style.
              </p>
            </div>
          </div>
        </div>

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
          {/* Left: upload */}
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

          {/* Right: result */}
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

        {/* Tech stack info */}
        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground/60 font-body">
            Powered by CNN / MobileNetV2 architecture · Image preprocessing at 224×224 · Transfer Learning
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
