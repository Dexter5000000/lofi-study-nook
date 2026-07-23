import { useState } from "react";
import { Dice5 } from "lucide-react";

const SIDES = [4, 6, 8, 10, 12, 20, 100];

export function DiceRoller() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [rolls, setRolls] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    const next = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
    window.setTimeout(() => {
      setRolls(next);
      setRolling(false);
    }, 300);
  };

  const total = rolls.reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Dice5 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Dice Roller</h2>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-3">
        <label className="text-xs">
          <span className="mb-1 block text-muted-foreground">Sides</span>
          <select
            value={sides}
            onChange={(e) => setSides(Number(e.target.value))}
            className="w-full rounded-lg border border-input bg-background px-2 py-1.5 text-sm"
          >
            {SIDES.map((s) => (
              <option key={s} value={s}>
                d{s}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-muted-foreground">Count</span>
          <input
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
            className="w-full rounded-lg border border-input bg-background px-2 py-1.5 text-sm"
          />
        </label>
      </div>
      <button
        onClick={roll}
        className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Roll
      </button>
      <div className={`mt-4 flex min-h-[64px] flex-wrap items-center justify-center gap-2 ${rolling ? "opacity-40" : ""}`}>
        {rolls.length === 0 ? (
          <span className="text-sm text-muted-foreground">Give it a roll ↑</span>
        ) : (
          <>
            {rolls.map((r, i) => (
              <span
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-lg font-semibold tabular-nums"
              >
                {r}
              </span>
            ))}
            {rolls.length > 1 && (
              <span className="ml-2 text-sm text-muted-foreground">= {total}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
