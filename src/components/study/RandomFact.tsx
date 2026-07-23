import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { FACTS, randomFact } from "@/lib/facts";

// Use a stable value for SSR + first client render to avoid hydration mismatch.
const PLACEHOLDER = FACTS[0];

export function RandomFact() {
  const [fact, setFact] = useState<string>(PLACEHOLDER);

  // Randomize only after mount, so server HTML and client HTML match on first paint.
  useEffect(() => {
    setFact(randomFact(PLACEHOLDER));
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold">Random Fact</h2>
      </div>
      <p className="min-h-[80px] text-sm leading-relaxed text-foreground/90">"{fact}"</p>
      <button
        onClick={() => setFact(randomFact(fact))}
        className="mt-3 w-full rounded-lg border border-border py-2 text-sm transition hover:bg-muted"
      >
        Another one
      </button>
    </div>
  );
}
