import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (base64: string, preview: string) => void;
  preview: string | null;
  onClear: () => void;
  isProcessing: boolean;
}

export function ImageUploader({ onImageSelect, preview, onClear, isProcessing }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      onImageSelect(base64, dataUrl);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  if (preview) {
    return (
      <div className="relative group rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg">
        <img src={preview} alt="Uploaded monument" className="w-full h-72 object-cover" />
        {!isProcessing && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 bg-foreground/70 text-background rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {isProcessing && (
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              <span className="text-primary-foreground font-body font-medium text-sm">Analyzing monument...</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-xl h-72 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        {isDragging ? (
          <ImageIcon className="w-8 h-8 text-primary" />
        ) : (
          <Upload className="w-8 h-8 text-primary" />
        )}
      </div>
      <div className="text-center">
        <p className="font-body font-semibold text-foreground">
          {isDragging ? "Drop your image here" : "Upload Monument Image"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">Drag & drop or click to browse</p>
        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP supported</p>
      </div>
    </div>
  );
}
