import Layout from "@/components/Layout";
import { Landmark, Brain, Database, Code, Target, Layers } from "lucide-react";

const techStack = [
  { icon: Brain, title: "CNN / MobileNetV2", desc: "Transfer learning model for accurate monument classification" },
  { icon: Layers, title: "Image Preprocessing", desc: "Images resized to 224×224 and normalized (0-1) for model input" },
  { icon: Database, title: "Cloud Database", desc: "Classification history stored securely with user authentication" },
  { icon: Code, title: "React + TypeScript", desc: "Modern frontend built with React, Tailwind CSS, and TypeScript" },
  { icon: Target, title: "AI Vision API", desc: "Powered by advanced vision models for high-accuracy identification" },
  { icon: Landmark, title: "Heritage Focus", desc: "Specialized in identifying UNESCO and nationally recognized monuments" },
];

const About = () => (
  <Layout>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">About This Project</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Heritage Monument Classifier is an AI-powered system that identifies heritage monuments from images using Convolutional Neural Networks and transfer learning.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-10">
        <h2 className="font-display text-xl font-bold text-foreground mb-4">How It Works</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <p><strong className="text-foreground">Image Upload:</strong> User uploads a photo of a heritage monument in JPG, PNG, or WebP format.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <p><strong className="text-foreground">Preprocessing:</strong> The image is resized to 224×224 pixels and pixel values are normalized to a 0-1 range.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <p><strong className="text-foreground">CNN Prediction:</strong> The preprocessed image is passed through a trained CNN model (MobileNetV2 architecture with transfer learning).</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <p><strong className="text-foreground">Result Display:</strong> The predicted monument class is displayed along with confidence score, location, historical period, and architectural style.</p>
          </div>
        </div>
      </div>

      {/* Tech */}
      <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">Technology Stack</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {techStack.map((t, i) => (
          <div key={i} className="p-4 bg-card border border-border rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <t.icon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-sm text-foreground mb-1">{t.title}</h3>
            <p className="text-xs text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Limitations */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-3">Current Limitations</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Works best with well-known heritage monuments</li>
          <li>Accuracy depends on image quality and angle</li>
          <li>No real-time camera support (image upload only)</li>
          <li>Limited to monument classification (not general object detection)</li>
        </ul>
      </div>
    </div>
  </Layout>
);

export default About;
