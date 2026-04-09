const examples = [
  { name: "Taj Mahal", location: "Agra, India" },
  { name: "Qutub Minar", location: "Delhi, India" },
  { name: "Colosseum", location: "Rome, Italy" },
  { name: "Great Wall", location: "China" },
  { name: "Machu Picchu", location: "Peru" },
];

export function MonumentExamples() {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">
        Try with monuments like
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {examples.map((ex) => (
          <span
            key={ex.name}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-xs font-body font-medium text-muted-foreground"
          >
            {ex.name}
            <span className="text-muted-foreground/50">· {ex.location}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
