import { MapPin, Calendar, Building2, TrendingUp, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ClassificationData {
  class: string;
  confidence: number;
  location?: string;
  description?: string;
  style?: string;
  era?: string;
}

interface ClassificationResultProps {
  result: ClassificationData;
}

export function ClassificationResult({ result }: ClassificationResultProps) {
  const confidenceColor =
    result.confidence >= 80
      ? "text-green-600"
      : result.confidence >= 50
        ? "text-yellow-600"
        : "text-red-500";

  return (
    <Card className="overflow-hidden border-primary/20 bg-card">
      {/* Header with monument name */}
      <div className="bg-primary px-6 py-5">
        <p className="text-primary-foreground/70 font-body text-xs uppercase tracking-widest mb-1">
          Predicted Class
        </p>
        <h2 className="font-display text-2xl font-bold text-primary-foreground">
          {result.class}
        </h2>
      </div>

      <div className="p-6 space-y-4">
        {/* Confidence bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body font-medium text-muted-foreground flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Confidence
            </span>
            <span className={`font-display font-bold text-lg ${confidenceColor}`}>
              {result.confidence}%
            </span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.location && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body">Location</p>
                <p className="text-sm font-body font-medium text-foreground">{result.location}</p>
              </div>
            </div>
          )}
          {result.era && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body">Era</p>
                <p className="text-sm font-body font-medium text-foreground">{result.era}</p>
              </div>
            </div>
          )}
          {result.style && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 sm:col-span-2">
              <Building2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body">Architectural Style</p>
                <p className="text-sm font-body font-medium text-foreground">{result.style}</p>
              </div>
            </div>
          )}
        </div>

        {/* Google Maps embed */}
        {result.location && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-widest">
                📍 Location on Map
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.location + (result.class ? ' ' + result.class : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1 font-body"
              >
                Open in Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <iframe
                title="Monument Location"
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(result.location + (result.class ? ' ' + result.class : ''))}&output=embed`}
              />
            </div>
          </div>
        )}

        {/* Description */}
        {result.description && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              {result.description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
