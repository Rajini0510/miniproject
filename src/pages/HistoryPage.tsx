import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Trash2, Clock, MapPin, Landmark, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Classification {
  id: string;
  monument_name: string;
  confidence: number;
  location: string | null;
  description: string | null;
  style: string | null;
  era: string | null;
  image_url: string | null;
  created_at: string;
}

const HistoryPage = () => {
  const [items, setItems] = useState<Classification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchHistory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("classifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load history");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("classifications").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted");
    }
  };

  const filtered = items.filter((item) =>
    item.monument_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Classification History</h1>
            <p className="text-sm text-muted-foreground mt-1">{items.length} classification{items.length !== 1 ? "s" : ""} total</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search monuments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-medium text-muted-foreground">No classifications yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Classify a monument and it will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex gap-4">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.monument_name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-foreground truncate">{item.monument_name}</h3>
                    <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <span className="font-semibold text-primary">{Math.round(item.confidence * 100)}%</span> confidence
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    )}
                    {item.era && <span>{item.era}</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground/60">
                    <Clock className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;
