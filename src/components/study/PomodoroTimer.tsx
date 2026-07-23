import { useEffect, useRef, useState } from "react";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";

type Mode = "focus" | "break";
const DURATIONS: Record<Mode, number> = { focus: 25 * 60, break: 5 * 60 };

export function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("focus");
  const [remaining, setRemaining] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setRemaining(DURATIONS[m]);
    setRunning(false);
  };

  const reset = () => {
    setRemaining(DURATIONS[mode]);
    setRunning(false);
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Pomodoro</h2>
      </div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => switchMode("focus")}
          className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition ${mode === "focus" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          Focus 25
        </button>
        <button
          onClick={() => switchMode("break")}
          className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition ${mode === "break" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          Break 5
        </button>
      </div>
      <div className="my-6 text-center font-mono text-6xl font-semibold tabular-nums">
        {mm}:{ss}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="rounded-lg border border-border p-2 transition hover:bg-muted"
          aria-label="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
