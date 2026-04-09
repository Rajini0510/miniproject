import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Get In Touch</h1>
          <p className="text-muted-foreground">
            Have questions about the project, suggestions, or want to contribute? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required maxLength={255} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="What's this about?" required maxLength={200} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Tell us more..." rows={5} required maxLength={1000} />
          </div>
          <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
            <Mail className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground">Email</h3>
              <p className="text-xs text-muted-foreground">heritage@classifier.edu</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
            <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground">Community</h3>
              <p className="text-xs text-muted-foreground">Join our open-source community</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
