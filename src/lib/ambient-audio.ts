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
let unlocked = false;

function createPlayer(kind: SoundKind): HTMLAudioElement {
  const el = new Audio(URLS[kind]);
  el.loop = true;
  el.preload = "auto";
  el.volume = 0;
  players[kind] = el;
  return el;
}

export function isUnlocked(): boolean {
  return unlocked;
}

export async function unlockSounds(): Promise<void> {
  if (unlocked) return;

  // Create all players first so they exist.
  const all = (Object.keys(URLS) as SoundKind[]).map((kind) => {
    const el = players[kind] ?? createPlayer(kind);
    return { kind, el };
  });

  // Unlock each audio element by playing it muted. This must be called from
  // within a user gesture handler (e.g. a button click) to satisfy the browser
  // autoplay policy.
  await Promise.all(
    all.map(async ({ el }) => {
      try {
        el.muted = true;
        await el.play();
      } catch {
        // Ignore autoplay denial; we'll retry when the user interacts again.
      }
    })
  );

  unlocked = true;

  // Reset state: keep all sounds paused and at zero volume. The UI will call
  // setSoundVolume with the current slider values right after unlocking.
  for (const { el } of all) {
    el.muted = false;
    el.volume = 0;
    el.pause();
  }
}

export function getPlayer(kind: SoundKind): HTMLAudioElement {
  return players[kind] ?? createPlayer(kind);
}

export function setSoundVolume(kind: SoundKind, value: number) {
  const el = getPlayer(kind);
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
