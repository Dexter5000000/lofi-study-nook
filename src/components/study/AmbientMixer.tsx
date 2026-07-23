import { useEffect, useState } from "react";
import { CloudRain, Flame, Wind, Coffee, Waves, TreePine, Volume2 } from "lucide-react";
import { setSoundVolume, stopAllSounds, type SoundKind } from "@/lib/ambient-audio";

const SOUNDS: { kind: SoundKind; label: string; Icon: typeof CloudRain }[] = [
  { kind: "rain", label: "Rain", Icon: CloudRain },
  { kind: "fire", label: "Fire", Icon: Flame },
  { kind: "wind", label: "Wind", Icon: Wind },
  { kind: "cafe", label: "Cafe", Icon: Coffee },
  { kind: "waves", label: "Waves", Icon: Waves },
  { kind: "forest", label: "Forest", Icon: TreePine },
];

export function AmbientMixer() {
  const [levels, setLevels] = useState<Record<SoundKind, number>>({
    rain: 0,
    fire: 0,
    wind: 0,
    cafe: 0,
    waves: 0,
    forest: 0,
  });

  useEffect(() => {
    return () => stopAllSounds();
  }, []);

  const update = (kind: SoundKind, value: number) => {
    setLevels((prev) => ({ ...prev, [kind]: value }));
    setSoundVolume(kind, value);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Volume2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Ambient Mixer</h2>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Layer real field recordings — mix rain, fire, cafe and more.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {SOUNDS.map(({ kind, label, Icon }) => (
          <div key={kind} className="rounded-xl bg-muted/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-accent" />
                {label}
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {Math.round(levels[kind] * 100)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={levels[kind]}
              onChange={(e) => update(kind, Number(e.target.value))}
              className="w-full accent-primary"
              aria-label={`${label} volume`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          stopAllSounds();
          setLevels({ rain: 0, fire: 0, wind: 0, cafe: 0, waves: 0, forest: 0 });
        }}
        className="mt-4 w-full rounded-lg border border-border py-2 text-sm transition hover:bg-muted"
      >
        Silence all
      </button>
    </div>
  );
}
