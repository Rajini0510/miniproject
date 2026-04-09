import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Landmark, Cpu, Layers, Zap, ArrowRight, Globe, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-monuments.jpg";

const features = [
  { icon: Layers, title: "Upload Any Image", desc: "Support for JPG, PNG, and WebP formats. Simply drag and drop or browse your files." },
  { icon: Cpu, title: "CNN Processing", desc: "Images are resized to 224×224 and normalized before passing through our trained model." },
  { icon: Zap, title: "Instant Results", desc: "Get monument identification with confidence scores, location data, and historical context." },
  { icon: Globe, title: "Global Coverage", desc: "Identifies monuments from across the world — temples, forts, palaces, and more." },
  { icon: Clock, title: "Classification History", desc: "All your past classifications are saved and accessible from your dashboard." },
  { icon: Shield, title: "Secure & Private", desc: "Your images are processed securely and not stored without your permission." },
];

const Landing = () => (
  <div className="min-h-screen bg-background font-body">
    {/* Nav */}
    <header className="border-b border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Landmark className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">Heritage Classifier</span>
        </div>
        <div className="ml-auto flex gap-2">
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>

    {/* Hero */}
    <section className="relative overflow-hidden">
      <img src={heroImage} alt="Heritage monuments" className="w-full h-[420px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex items-end">
        <div className="max-w-6xl mx-auto px-4 pb-12 w-full">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 max-w-2xl">
            Identify Heritage Monuments with AI
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mb-6">
            Upload a photo of any heritage monument and our CNN-based deep learning model will identify it instantly with historical details.
          </p>
          <Link to="/auth">
            <Button size="lg" className="h-12 px-8 font-semibold text-base">
              Start Classifying <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">How It Works</h2>
      <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
        Our system uses a Convolutional Neural Network trained on heritage monument datasets to deliver accurate classifications.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary/5 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 py-14 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Ready to Explore Heritage?</h2>
        <p className="text-muted-foreground mb-6">Create a free account and start identifying monuments today.</p>
        <Link to="/auth">
          <Button size="lg" className="h-12 px-8 font-semibold">Create Account</Button>
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="max-w-6xl mx-auto px-4 py-6 text-center">
      <p className="text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Heritage Monument Classifier. Built for educational purposes.
      </p>
    </footer>
  </div>
);

export default Landing;
