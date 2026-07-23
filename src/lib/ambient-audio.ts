export type SoundKind = "rain" | "fire" | "wind" | "cafe" | "waves" | "forest";

const URLS: Record<SoundKind, string> = {
  rain: "/sounds/rain.mp3",
  fire: "/sounds/fire.mp3",
  wind: "/sounds/wind.mp3",
  cafe: "/sounds/cafe.mp3",
  waves: "/sounds/waves.mp3",
  forest: "/sounds/forest.mp3",
};

interface SoundNode {
  buffer: AudioBuffer;
  gain: GainNode;
  source: AudioBufferSourceNode;
}

let ctx: AudioContext | null = null;
const nodes: Partial<Record<SoundKind, SoundNode>> = {};
let unlocked = false;
let unlocking = false;

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function createContext(): AudioContext {
  const Ctx = (window as typeof window & { webkitAudioContext?: typeof AudioContext }).AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) {
    throw new Error("Web Audio API is not supported in this browser.");
  }
  return new Ctx();
}

async function fetchAndDecode(kind: SoundKind): Promise<AudioBuffer> {
  const response = await fetch(URLS[kind]);
  if (!response.ok) {
    throw new Error(`Failed to load ${URLS[kind]}: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  if (!ctx) throw new Error("AudioContext is not available.");
  return ctx.decodeAudioData(arrayBuffer);
}

export function isUnlocked(): boolean {
  return unlocked;
}

export async function unlockSounds(): Promise<void> {
  if (unlocked) return;
  if (unlocking) {
    // Wait for an in-progress unlock to finish.
    while (unlocking) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return;
  }

  unlocking = true;
  try {
    ctx = createContext();
    // resume() must be triggered inside a user gesture; calling it here is the
    // whole point of the unlock button.
    await ctx.resume();

    const kinds = Object.keys(URLS) as SoundKind[];
    const buffers = await Promise.all(
      kinds.map(async (kind) => {
        try {
          const buffer = await fetchAndDecode(kind);
          return { kind, buffer } as const;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Ambient sound "${kind}" could not be loaded.`, error);
          return { kind, buffer: null as unknown as AudioBuffer };
        }
      })
    );

    for (const { kind, buffer } of buffers) {
      if (!buffer) continue;
      if (!ctx) continue;

      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.value = 0;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      source.start(0);

      nodes[kind] = { buffer, gain, source };
    }

    unlocked = true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to unlock ambient sounds.", error);
    throw error;
  } finally {
    unlocking = false;
  }
}

export function setSoundVolume(kind: SoundKind, value: number) {
  if (!unlocked || !ctx) return;
  const node = nodes[kind];
  if (!node) return;
  node.gain.gain.value = clamp(value);
}

export function stopAllSounds() {
  for (const kind of Object.keys(nodes) as SoundKind[]) {
    const node = nodes[kind];
    if (!node) continue;
    try {
      node.source.stop();
    } catch {
      // Already stopped.
    }
    node.source.disconnect();
    node.gain.disconnect();
    delete nodes[kind];
  }

  if (ctx) {
    try {
      ctx.close();
    } catch {
      // Ignore.
    }
    ctx = null;
  }

  unlocked = false;
  unlocking = false;
}
