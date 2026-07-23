export function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  // Bare ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com") || host === "youtube-nocookie.com") {
      if (url.pathname === "/watch") {
        const v = url.searchParams.get("v");
        return v && /^[a-zA-Z0-9_-]{11}$/.test(v) ? v : null;
      }
      const m = url.pathname.match(/^\/(embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/);
      if (m) return m[2];
    }
  } catch {
    // fall through
  }
  return null;
}
