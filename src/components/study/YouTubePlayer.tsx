import { useState } from "react";
import { Youtube } from "lucide-react";
import { extractYouTubeId } from "@/lib/youtube";

export function YouTubePlayer() {
  const [input, setInput] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeId(input);
    if (!id) {
      setError("That doesn't look like a valid YouTube URL.");
      setVideoId(null);
      return;
    }
    setError(null);
    setVideoId(id);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Youtube className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold">YouTube Player</h2>
      </div>
      <form onSubmit={handleLoad} className="mb-3 flex gap-2">
        <input
          type="text"
          value={input}
          maxLength={500}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a YouTube URL…"
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Play
        </button>
      </form>
      {error && <p className="mb-2 text-xs text-destructive">{error}</p>}
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        {videoId ? (
          <iframe
            key={videoId}
            title="YouTube video"
            src={`https://www.youtube.com/embed/${videoId}`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No video loaded
          </div>
        )}
      </div>
    </div>
  );
}
