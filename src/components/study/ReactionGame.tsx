import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";

type Status = "idle" | "waiting" | "ready" | "result" | "tooSoon";

export function ReactionGame() {
  const [status, setStatus] = useState<Status>("idle");
  const [time, setTime] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const startRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const begin = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setStatus("waiting");
    setTime(null);
    const delay = 1200 + Math.random() * 2800;
    timeoutRef.current = window.setTimeout(() => {
      startRef.current = performance.now();
      setStatus("ready");
      timeoutRef.current = null;
    }, delay);
  };

  const click = () => {
    if (status === "idle" || status === "result" || status === "tooSoon") {
      begin();
      return;
    }
    if (status === "waiting") {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setStatus("tooSoon");
      return;
    }
    if (status === "ready") {
      const elapsed = Math.round(performance.now() - startRef.current);
      setTime(elapsed);
      setBest((b) => (b === null || elapsed < b ? elapsed : b));
      setStatus("result");
    }
  };

  const bg = {
    idle: "bg-muted",
    waiting: "bg-accent",
    ready: "bg-primary",
    result: "bg-muted",
    tooSoon: "bg-destructive",
  }[status];

  const label = {
    idle: "Click to start",
    waiting: "Wait for green…",
    ready: "CLICK!",
    result: `${time} ms — click for another`,
    tooSoon: "Too soon! Click to retry",
  }[status];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold">Reaction Test</h2>
      </div>
      <button
        onClick={click}
        className={`flex h-40 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors ${bg}`}
      >
        {label}
      </button>
      {best !== null && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Best: <span className="font-semibold text-foreground">{best} ms</span>
        </p>
      )}
    </div>
  );
}
