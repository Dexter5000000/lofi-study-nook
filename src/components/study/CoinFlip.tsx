import { useEffect, useRef, useState } from "react";
import { CircleDot } from "lucide-react";

export function CoinFlip() {
  const [result, setResult] = useState<"Heads" | "Tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const flip = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setFlipping(true);
    timeoutRef.current = window.setTimeout(() => {
      setResult(Math.random() < 0.5 ? "Heads" : "Tails");
      setFlipping(false);
      timeoutRef.current = null;
    }, 500);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <CircleDot className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Coin Flip</h2>
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg font-bold shadow-lg transition-transform duration-500 ${flipping ? "animate-spin" : ""}`}
        >
          {result ?? "?"}
        </div>
        <button
          onClick={flip}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Flip
        </button>
      </div>
    </div>
  );
}
