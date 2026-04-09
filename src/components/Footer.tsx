import { Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 mt-auto">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Landmark className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground text-sm">Heritage Classifier</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI-powered heritage monument identification using CNN / MobileNetV2 architecture.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-3">Quick Links</h4>
          <div className="space-y-2">
            {[
              { to: "/", label: "Classifier" },
              { to: "/history", label: "History" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-3">Tech Stack</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>CNN / MobileNetV2</p>
            <p>Transfer Learning</p>
            <p>224×224 Image Processing</p>
            <p>React + TypeScript</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-6 pt-4 text-center">
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Heritage Monument Classifier. Built for educational purposes.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
