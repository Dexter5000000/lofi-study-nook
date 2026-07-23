import { useState } from "react";
import { Radio } from "lucide-react";

type Station = { id: string; name: string; type: "video" | "playlist" };

const STATIONS: Station[] = [
  { id: "jfKfPfyJRdk", name: "Lofi Girl — beats to relax/study (live)", type: "video" },
  { id: "rUxyKA_-grg", name: "Lofi Girl — sleepy beats (live)", type: "video" },
  { id: "4xDzrJKXOOY", name: "Synthwave radio — beats to chill/drive (live)", type: "video" },
  { id: "MVPTGNGiI-4", name: "Chillhop radio — jazzy beats (live)", type: "video" },
  { id: "S_MOd40zlYU", name: "Dark ambient radio — deep focus (live)", type: "video" },
  { id: "DWcJFNfaw9c", name: "Chillsynth FM — synthwave (live)", type: "video" },
  { id: "n61ULEU7CO0", name: "Box Lounge — jazz hop café (live)", type: "video" },
  { id: "-FlxM_0S2lA", name: "Coffee shop radio — jazz vibes (live)", type: "video" },
  { id: "7NOSDKb0HlU", name: "Lofi hip hop — chill beats (live)", type: "video" },
  { id: "TtkFsfOP9QI", name: "Retrowave — driving mix (live)", type: "video" },
  { id: "edqlOxtnvL0", name: "24/7 Electronic Music mix", type: "video" },
];

export function LofiRadio() {
  const [station, setStation] = useState(STATIONS[0]);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Radio className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Lofi Radio</h2>
      </div>

      {playing ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            key={`${station.type}-${station.id}`}
            title={station.name}
            src={
              station.type === "playlist"
                ? `https://www.youtube.com/embed/videoseries?list=${station.id}&autoplay=1`
                : `https://www.youtube.com/embed/${station.id}?autoplay=1`
            }
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="flex aspect-video w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground transition hover:bg-muted/70"
        >
          ▶ Tap to start the stream
        </button>
      )}

      <div className="mt-4 space-y-1">
        {STATIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setStation(s);
              setPlaying(true);
            }}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              s.id === station.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
