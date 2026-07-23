export type SoundKind = "rain" | "fire" | "wind" | "cafe" | "waves" | "forest";

interface SoundNode {
  buffer: AudioBuffer;
  gain: GainNode;
  source: AudioBufferSourceNode;
}

const DURATION = 5; // seconds per generated loop
const SAMPLE_RATE = 44100;

let ctx: AudioContext | null = null;
const nodes: Partial<Record<SoundKind, SoundNode>> = {};
let unlocked = false;
let unlocking = false;

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function createContext(): AudioContext {
  const Ctx =
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) {
    throw new Error("Web Audio API is not supported in this browser.");
  }
  return new Ctx() as AudioContext;
}

function fillWhiteNoise(out: Float32Array) {
  for (let i = 0; i < out.length; i++) {
    out[i] = Math.random() * 2 - 1;
  }
}

function fillPinkNoise(out: Float32Array) {
  let b0 = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0,
    b4 = 0,
    b5 = 0,
    b6 = 0;
  for (let i = 0; i < out.length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6) * 0.11;
    b6 = white * 0.5362;
  }
}

function fillBrownNoise(out: Float32Array) {
  let last = 0;
  for (let i = 0; i < out.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + white * 0.02) / 1.02;
    out[i] = last * 3.5;
  }
}

function fillCrackleNoise(out: Float32Array) {
  let last = 0;
  for (let i = 0; i < out.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + white * 0.02) / 1.02;
    let v = last * 3.5;
    // sharp crackles
    if (Math.random() < 0.0003) v += (Math.random() * 2 - 1) * 2;
    out[i] = v;
  }
}

function fillBirdChirps(out: Float32Array, sampleRate: number) {
  fillPinkNoise(out);
  // overlay sparse chirps
  for (let i = 0; i < out.length; i++) {
    if (Math.random() < 0.00005) {
      const duration = Math.floor(sampleRate * (0.02 + Math.random() * 0.06));
      const freq = 2000 + Math.random() * 3000;
      for (let j = 0; j < duration && i + j < out.length; j++) {
        const t = j / sampleRate;
        const env = Math.max(0, 1 - j / duration);
        out[i + j] += Math.sin(2 * Math.PI * freq * t) * env * 0.3;
      }
      i += duration;
    }
  }
}

function createStereoBuffer(ctx: AudioContext, fill: (left: Float32Array, sampleRate: number) => void): AudioBuffer {
  const frames = DURATION * ctx.sampleRate;
  const buffer = ctx.createBuffer(2, frames, ctx.sampleRate);
  const left = new Float32Array(frames);
  fill(left, ctx.sampleRate);
  // Use the same data for both channels for a subtle, non-phasey mono spread.
  buffer.copyToChannel(left, 0);
  buffer.copyToChannel(left, 1);
  return buffer;
}

function getBuffer(ctx: AudioContext, kind: SoundKind): AudioBuffer {
  switch (kind) {
    case "rain":
      return createStereoBuffer(ctx, (out) => fillPinkNoise(out));
    case "wind":
      return createStereoBuffer(ctx, (out) => fillPinkNoise(out));
    case "waves":
      return createStereoBuffer(ctx, (out) => fillBrownNoise(out));
    case "fire":
      return createStereoBuffer(ctx, (out) => fillCrackleNoise(out));
    case "forest":
      return createStereoBuffer(ctx, (out) => fillBirdChirps(out, ctx.sampleRate));
    case "cafe":
      return createStereoBuffer(ctx, (out) => fillPinkNoise(out));
    default:
      return createStereoBuffer(ctx, (out) => fillPinkNoise(out));
  }
}

function createFilter(ctx: AudioContext, kind: SoundKind): { source: AudioBufferSourceNode; gain: GainNode } {
  const source = ctx.createBufferSource();
  source.buffer = getBuffer(ctx, kind);
  source.loop = true;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  switch (kind) {
    case "rain": {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1000;
      filter.Q.value = 0;
      source.connect(filter);
      filter.connect(gain);
      break;
    }
    case "wind": {
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 500;
      filter.Q.value = 1;
      source.connect(filter);
      filter.connect(gain);
      break;
    }
    case "waves": {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 600;
      filter.Q.value = 0;
      source.connect(filter);
      filter.connect(gain);
      break;
    }
    case "fire": {
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1500;
      filter.Q.value = 0.5;
      source.connect(filter);
      filter.connect(gain);
      break;
    }
    case "forest": {
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2000;
      filter.Q.value = 0.5;
      source.connect(filter);
      filter.connect(gain);
      break;
    }
    case "cafe": {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2500;
      filter.Q.value = 0;
      source.connect(filter);
      filter.connect(gain);
      break;
    }
  }

  source.start(0);
  return { source, gain };
}

export function isUnlocked(): boolean {
  return unlocked;
}

export async function unlockSounds(): Promise<void> {
  if (unlocked) return;
  if (unlocking) {
    while (unlocking) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return;
  }

  unlocking = true;
  try {
    ctx = createContext();
    await ctx.resume();

    const kinds: SoundKind[] = ["rain", "fire", "wind", "cafe", "waves", "forest"];
    for (const kind of kinds) {
      if (!ctx) continue;
      const { source, gain } = createFilter(ctx, kind);
      nodes[kind] = { buffer: source.buffer!, gain, source };
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
  node.gain.gain.value = clamp(value) * 0.5; // keep levels comfortable
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
