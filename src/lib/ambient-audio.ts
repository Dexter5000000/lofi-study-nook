export type SoundKind = "rain" | "fire" | "wind" | "cafe" | "waves" | "forest";

const URLS: Record<SoundKind, string> = {
  rain: "/sounds/rain.mp3",
  fire: "/sounds/fire.mp3",
  wind: "/sounds/wind.mp3",
  cafe: "/sounds/cafe.mp3",
  waves: "/sounds/waves.mp3",
  forest: "/sounds/forest.mp3",
};

const players: Partial<Record<SoundKind, HTMLAudioElement>> = {};

function get(kind: SoundKind): HTMLAudioElement {
  let el = players[kind];
  if (!el) {
    el = new Audio(URLS[kind]);
    el.loop = true;
    el.preload = "auto";
    el.volume = 0;
    players[kind] = el;
  }
  return el;
}

export function setSoundVolume(kind: SoundKind, value: number) {
  const el = get(kind);
  const v = Math.max(0, Math.min(1, value));
  el.volume = v;
  if (v > 0) {
    if (el.paused) el.play().catch(() => {});
  } else {
    el.pause();
  }
}

export function stopAllSounds() {
  (Object.keys(players) as SoundKind[]).forEach((k) => {
    const el = players[k];
    if (el) {
      el.pause();
      el.currentTime = 0;
      el.volume = 0;
    }
  });
}
