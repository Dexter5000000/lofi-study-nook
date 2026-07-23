import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Radio, Volume2, CloudRain, Flame, Wind, Coffee, Waves, TreePine, Youtube, Dice5, CircleDot, Lightbulb, Pencil, Eraser, Download, Trash2, Zap, Timer, Pause, Play, RotateCcw, ChevronRight, Check, Circle, Palette, Sparkles } from "lucide-react";
import * as React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const STATIONS = [
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
  { id: "edqlOxtnvL0", name: "24/7 Electronic Music mix", type: "video" }
];
function LofiRadio() {
  const [station, setStation] = useState(STATIONS[0]);
  const [playing, setPlaying] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Radio, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Lofi Radio" })
    ] }),
    playing ? /* @__PURE__ */ jsx("div", { className: "aspect-video w-full overflow-hidden rounded-xl bg-black", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        title: station.name,
        src: station.type === "playlist" ? `https://www.youtube.com/embed/videoseries?list=${station.id}&autoplay=1` : `https://www.youtube.com/embed/${station.id}?autoplay=1`,
        className: "h-full w-full",
        allow: "autoplay; encrypted-media; picture-in-picture",
        allowFullScreen: true
      },
      `${station.type}-${station.id}`
    ) }) : /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setPlaying(true),
        className: "flex aspect-video w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground transition hover:bg-muted/70",
        children: "▶ Tap to start the stream"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-1", children: STATIONS.map((s) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setStation(s);
          setPlaying(true);
        },
        className: `w-full rounded-lg px-3 py-2 text-left text-sm transition ${s.id === station.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
        children: s.name
      },
      s.id
    )) })
  ] });
}
const URLS = {
  rain: "/sounds/rain.mp3",
  fire: "/sounds/fire.mp3",
  wind: "/sounds/wind.mp3",
  cafe: "/sounds/cafe.mp3",
  waves: "/sounds/waves.mp3",
  forest: "/sounds/forest.mp3"
};
const players = {};
function get(kind) {
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
function setSoundVolume(kind, value) {
  const el = get(kind);
  const v = Math.max(0, Math.min(1, value));
  el.volume = v;
  if (v > 0) {
    if (el.paused) el.play().catch(() => {
    });
  } else {
    el.pause();
  }
}
function stopAllSounds() {
  Object.keys(players).forEach((k) => {
    const el = players[k];
    if (el) {
      el.pause();
      el.currentTime = 0;
      el.volume = 0;
    }
  });
}
const SOUNDS = [
  { kind: "rain", label: "Rain", Icon: CloudRain },
  { kind: "fire", label: "Fire", Icon: Flame },
  { kind: "wind", label: "Wind", Icon: Wind },
  { kind: "cafe", label: "Cafe", Icon: Coffee },
  { kind: "waves", label: "Waves", Icon: Waves },
  { kind: "forest", label: "Forest", Icon: TreePine }
];
function AmbientMixer() {
  const [levels, setLevels] = useState({
    rain: 0,
    fire: 0,
    wind: 0,
    cafe: 0,
    waves: 0,
    forest: 0
  });
  useEffect(() => {
    return () => stopAllSounds();
  }, []);
  const update = (kind, value) => {
    setLevels((prev) => ({ ...prev, [kind]: value }));
    setSoundVolume(kind, value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Volume2, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Ambient Mixer" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs text-muted-foreground", children: "Layer real field recordings — mix rain, fire, cafe and more." }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: SOUNDS.map(({ kind, label, Icon }) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-muted/50 p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-accent" }),
          label
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs tabular-nums text-muted-foreground", children: Math.round(levels[kind] * 100) })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: levels[kind],
          onChange: (e) => update(kind, Number(e.target.value)),
          className: "w-full accent-primary",
          "aria-label": `${label} volume`
        }
      )
    ] }, kind)) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          stopAllSounds();
          setLevels({ rain: 0, fire: 0, wind: 0, cafe: 0, waves: 0, forest: 0 });
        },
        className: "mt-4 w-full rounded-lg border border-border py-2 text-sm transition hover:bg-muted",
        children: "Silence all"
      }
    )
  ] });
}
function extractYouTubeId(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
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
  }
  return null;
}
function YouTubePlayer() {
  const [input, setInput] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState(null);
  const handleLoad = (e) => {
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
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Youtube, { className: "h-5 w-5 text-accent" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "YouTube Player" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLoad, className: "mb-3 flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: input,
          maxLength: 500,
          onChange: (e) => setInput(e.target.value),
          placeholder: "Paste a YouTube URL…",
          className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
          children: "Play"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs text-destructive", children: error }),
    /* @__PURE__ */ jsx("div", { className: "aspect-video w-full overflow-hidden rounded-xl bg-black", children: videoId ? /* @__PURE__ */ jsx(
      "iframe",
      {
        title: "YouTube video",
        src: `https://www.youtube.com/embed/${videoId}`,
        className: "h-full w-full",
        allow: "autoplay; encrypted-media; picture-in-picture",
        allowFullScreen: true
      },
      videoId
    ) : /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-sm text-muted-foreground", children: "No video loaded" }) })
  ] });
}
const SIDES = [4, 6, 8, 10, 12, 20, 100];
function DiceRoller() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [rolls, setRolls] = useState([]);
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
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Dice5, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Dice Roller" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-3 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("label", { className: "text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "mb-1 block text-muted-foreground", children: "Sides" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: sides,
            onChange: (e) => setSides(Number(e.target.value)),
            className: "w-full rounded-lg border border-input bg-background px-2 py-1.5 text-sm",
            children: SIDES.map((s) => /* @__PURE__ */ jsxs("option", { value: s, children: [
              "d",
              s
            ] }, s))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "mb-1 block text-muted-foreground", children: "Count" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            min: 1,
            max: 10,
            value: count,
            onChange: (e) => setCount(Math.max(1, Math.min(10, Number(e.target.value) || 1))),
            className: "w-full rounded-lg border border-input bg-background px-2 py-1.5 text-sm"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: roll,
        className: "w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
        children: "Roll"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `mt-4 flex min-h-[64px] flex-wrap items-center justify-center gap-2 ${rolling ? "opacity-40" : ""}`, children: rolls.length === 0 ? /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Give it a roll ↑" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      rolls.map((r, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-lg font-semibold tabular-nums",
          children: r
        },
        i
      )),
      rolls.length > 1 && /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm text-muted-foreground", children: [
        "= ",
        total
      ] })
    ] }) })
  ] });
}
function CoinFlip() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const timeoutRef = useRef(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);
  const flip = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setFlipping(true);
    timeoutRef.current = window.setTimeout(() => {
      setResult(Math.random() < 0.5 ? "Heads" : "Tails");
      setFlipping(false);
      timeoutRef.current = null;
    }, 500);
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(CircleDot, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Coin Flip" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 py-4", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg font-bold shadow-lg transition-transform duration-500 ${flipping ? "animate-spin" : ""}`,
          children: result ?? "?"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: flip,
          className: "rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
          children: "Flip"
        }
      )
    ] })
  ] });
}
const FACTS = [
  "Octopuses have three hearts and blue blood.",
  "Honey never spoils — edible pots have been found in 3,000-year-old tombs.",
  "Bananas are berries, but strawberries are not.",
  "A group of flamingos is called a 'flamboyance'.",
  "The Eiffel Tower can grow more than 6 inches taller in summer heat.",
  "Wombat poop is cube-shaped.",
  "Sharks existed before trees did.",
  "There are more possible chess games than atoms in the observable universe.",
  "A day on Venus is longer than a year on Venus.",
  "Cows have best friends and get stressed when separated.",
  "The unicorn is Scotland's national animal.",
  "Bubble wrap was originally invented as textured wallpaper.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "Your stomach gets a new lining every 3–4 days.",
  "The dot over a lowercase 'i' or 'j' is called a tittle.",
  "Slugs have four noses.",
  "Ketchup was sold as medicine in the 1830s.",
  "A cloud can weigh over a million pounds.",
  "There's a species of jellyfish that is biologically immortal.",
  "Bees can recognize human faces.",
  "The inventor of the Pringles can is buried in one.",
  "Rats laugh when tickled — at ultrasonic frequencies.",
  "The shortest war in history lasted 38 minutes.",
  "You can't hum while holding your nose.",
  "Pineapples take about two years to grow."
];
function randomFact(exclude) {
  let pick = FACTS[Math.floor(Math.random() * FACTS.length)];
  if (exclude && FACTS.length > 1) {
    while (pick === exclude) pick = FACTS[Math.floor(Math.random() * FACTS.length)];
  }
  return pick;
}
const PLACEHOLDER = FACTS[0];
function RandomFact() {
  const [fact, setFact] = useState(PLACEHOLDER);
  useEffect(() => {
    setFact(randomFact(PLACEHOLDER));
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Lightbulb, { className: "h-5 w-5 text-accent" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Random Fact" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "min-h-[80px] text-sm leading-relaxed text-foreground/90", children: [
      '"',
      fact,
      '"'
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setFact(randomFact(fact)),
        className: "mt-3 w-full rounded-lg border border-border py-2 text-sm transition hover:bg-muted",
        children: "Another one"
      }
    )
  ] });
}
const COLORS = ["#f5e6c8", "#e8a87c", "#c38d9e", "#85dcba", "#7ec4cf", "#e27d60"];
function DoodlePad() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef(null);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(4);
  const [erasing, setErasing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let hasContent = false;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const prev = hasContent ? canvas.toDataURL() : null;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.floor(320 * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `320px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (prev) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, 320);
        img.src = prev;
      }
    };
    resize();
    const markDirty = () => {
      hasContent = true;
    };
    canvas.addEventListener("pointerdown", markDirty, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      canvas.removeEventListener("pointerdown", markDirty);
      window.removeEventListener("resize", resize);
    };
  }, []);
  const pos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const start = (e) => {
    drawingRef.current = true;
    lastRef.current = pos(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !lastRef.current) return;
    const p = pos(e);
    ctx.strokeStyle = erasing ? "#2a1f1a" : color;
    ctx.lineWidth = erasing ? size * 3 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
  };
  const end = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };
  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "doodle.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Pencil, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Doodle Pad" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-wrap items-center gap-2", children: [
      COLORS.map((c) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setColor(c);
            setErasing(false);
          },
          className: `h-7 w-7 rounded-full border-2 transition ${color === c && !erasing ? "border-foreground scale-110" : "border-transparent"}`,
          style: { backgroundColor: c },
          "aria-label": `Color ${c}`
        },
        c
      )),
      /* @__PURE__ */ jsx("div", { className: "mx-2 h-6 w-px bg-border" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min: 1,
          max: 20,
          value: size,
          onChange: (e) => setSize(Number(e.target.value)),
          className: "w-20 accent-primary",
          "aria-label": "Brush size"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setErasing((v) => !v),
          className: `ml-auto rounded-lg p-2 transition ${erasing ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
          "aria-label": "Eraser",
          children: /* @__PURE__ */ jsx(Eraser, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx("button", { onClick: download, className: "rounded-lg p-2 transition hover:bg-muted", "aria-label": "Download", children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx("button", { onClick: clear, className: "rounded-lg p-2 transition hover:bg-muted", "aria-label": "Clear", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden rounded-xl bg-[#2a1f1a]", children: /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: canvasRef,
        onPointerDown: start,
        onPointerMove: move,
        onPointerUp: end,
        onPointerLeave: end,
        className: "block cursor-crosshair touch-none"
      }
    ) })
  ] });
}
function ReactionGame() {
  const [status, setStatus] = useState("idle");
  const [time, setTime] = useState(null);
  const [best, setBest] = useState(null);
  const startRef = useRef(0);
  const timeoutRef = useRef(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);
  const begin = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setStatus("waiting");
    setTime(null);
    const delay = 1200 + Math.random() * 2800;
    timeoutRef.current = window.setTimeout(() => {
      startRef.current = performance.now();
      setStatus("ready");
      timeoutRef.current = null;
    }, delay);
  };
  const click = () => {
    if (status === "idle" || status === "result" || status === "tooSoon") {
      begin();
      return;
    }
    if (status === "waiting") {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setStatus("tooSoon");
      return;
    }
    if (status === "ready") {
      const elapsed = Math.round(performance.now() - startRef.current);
      setTime(elapsed);
      setBest((b) => b === null || elapsed < b ? elapsed : b);
      setStatus("result");
    }
  };
  const bg = {
    idle: "bg-muted",
    waiting: "bg-accent",
    ready: "bg-primary",
    result: "bg-muted",
    tooSoon: "bg-destructive"
  }[status];
  const label = {
    idle: "Click to start",
    waiting: "Wait for green…",
    ready: "CLICK!",
    result: `${time} ms — click for another`,
    tooSoon: "Too soon! Click to retry"
  }[status];
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Zap, { className: "h-5 w-5 text-accent" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Reaction Test" })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: click,
        className: `flex h-40 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors ${bg}`,
        children: label
      }
    ),
    best !== null && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-center text-xs text-muted-foreground", children: [
      "Best: ",
      /* @__PURE__ */ jsxs("span", { className: "font-semibold text-foreground", children: [
        best,
        " ms"
      ] })
    ] })
  ] });
}
const DURATIONS = { focus: 25 * 60, break: 5 * 60 };
function PomodoroTimer() {
  const [mode, setMode] = useState("focus");
  const [remaining, setRemaining] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
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
    }, 1e3);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);
  const switchMode = (m) => {
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
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Timer, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Pomodoro" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => switchMode("focus"),
          className: `flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition ${mode === "focus" ? "bg-primary text-primary-foreground" : "bg-muted"}`,
          children: "Focus 25"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => switchMode("break"),
          className: `flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition ${mode === "break" ? "bg-primary text-primary-foreground" : "bg-muted"}`,
          children: "Break 5"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my-6 text-center font-mono text-6xl font-semibold tabular-nums", children: [
      mm,
      ":",
      ss
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setRunning((r) => !r),
          className: "flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
          children: [
            running ? /* @__PURE__ */ jsx(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Play, { className: "h-4 w-4" }),
            running ? "Pause" : "Start"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: reset,
          className: "rounded-lg border border-border p-2 transition hover:bg-muted",
          "aria-label": "Reset",
          children: /* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const THEMES = [
  {
    id: "jdm",
    className: "theme-jdm",
    name: "JDM Poster",
    description: "Silver garage, crimson accent — the original tuner-poster vibe.",
    swatch: ["#d3d5d8", "#4b4d51", "#d63838"]
  },
  {
    id: "tokyo",
    className: "theme-tokyo",
    name: "Tokyo Neon",
    description: "Rain-slick streets, magenta signs and cyan glow after midnight.",
    swatch: ["#1a1030", "#f062a6", "#3dd6ff"]
  },
  {
    id: "cafe",
    className: "theme-cafe",
    name: "Cozy Cafe",
    description: "Latte foam, warm oak, espresso — a rainy-afternoon reading nook.",
    swatch: ["#f2e7d4", "#8b6b4a", "#c88a52"]
  },
  {
    id: "forest",
    className: "theme-forest",
    name: "Forest Study",
    description: "Deep pine, moss and a single reading lamp in the woods.",
    swatch: ["#1e2a22", "#7ec27a", "#c9b56b"]
  },
  {
    id: "vapor",
    className: "theme-vapor",
    name: "Vaporwave Sunset",
    description: "Pastel purples, peach sky, chrome palm trees on the horizon.",
    swatch: ["#3a2450", "#ff9ad0", "#7fe0d4"]
  },
  {
    id: "ocean",
    className: "theme-ocean",
    name: "Midnight Ocean",
    description: "Navy depths, moon-silvered water, quiet lighthouse teal.",
    swatch: ["#0f1d33", "#59b6d9", "#4ec3b8"]
  },
  {
    id: "sakura",
    className: "theme-sakura",
    name: "Sakura Bloom",
    description: "Cream paper and cherry-blossom pink — soft spring afternoons.",
    swatch: ["#fff0ec", "#ef8fa1", "#f7c6d2"]
  },
  {
    id: "academia",
    className: "theme-academia",
    name: "Dark Academia",
    description: "Old library sepia, burgundy leather and worn brass.",
    swatch: ["#2b241d", "#a34a2b", "#c9a25e"]
  },
  {
    id: "terminal",
    className: "theme-terminal",
    name: "Retro Terminal",
    description: "CRT scanlines and phosphor-green text on jet black.",
    swatch: ["#0d1a10", "#5fff8f", "#1f3325"]
  },
  {
    id: "pastel",
    className: "theme-pastel",
    name: "Pastel Dream",
    description: "Marshmallow lavender, mint and baby-blue — impossibly gentle.",
    swatch: ["#f4edff", "#b6a4ea", "#a8e0d3"]
  },
  {
    id: "autumn",
    className: "theme-autumn",
    name: "Autumn Leaves",
    description: "Rust, amber and warm oak — sweater-weather study energy.",
    swatch: ["#2f2418", "#e08a3c", "#c74a1e"]
  },
  {
    id: "arctic",
    className: "theme-arctic",
    name: "Arctic Frost",
    description: "Snow paper and icy blue — crisp, quiet, wide open.",
    swatch: ["#f5f8fc", "#3b7fc0", "#9ec7e0"]
  },
  {
    id: "matcha",
    className: "theme-matcha",
    name: "Matcha Latte",
    description: "Cream ceramic and stone-ground matcha green.",
    swatch: ["#eee7d4", "#7aa15a", "#a7c48a"]
  },
  {
    id: "blueprint",
    className: "theme-blueprint",
    name: "Blueprint",
    description: "Architect's paper — deep blue field, glowing cyan lines.",
    swatch: ["#1e3a70", "#a8dcf5", "#c0e7ff"]
  },
  {
    id: "peach",
    className: "theme-peach",
    name: "Peach Fuzz",
    description: "Warm coral and cream — soft morning sun through curtains.",
    swatch: ["#ffe6d1", "#ee8a5a", "#f2b48a"]
  },
  {
    id: "mono",
    className: "theme-mono",
    name: "Monochrome",
    description: "Pure paper, ink black, zero distractions.",
    swatch: ["#ffffff", "#111111", "#cccccc"]
  },
  {
    id: "cyber",
    className: "theme-cyber",
    name: "Cyber Void",
    description: "Pitch black, electric violet and laser-lime highlights.",
    swatch: ["#0a0512", "#b34dff", "#c8ff3d"]
  },
  {
    id: "rosegold",
    className: "theme-rosegold",
    name: "Rose Gold",
    description: "Dusty pink and champagne — quiet luxury, gentle contrast.",
    swatch: ["#f3e2d6", "#c78a76", "#dcb28a"]
  },
  {
    id: "solar",
    className: "theme-solar",
    name: "Solar Flare",
    description: "Charcoal night torn open by fiery yellow-orange.",
    swatch: ["#1b1712", "#f2b62b", "#e56b26"]
  },
  {
    id: "lavender",
    className: "theme-lavender",
    name: "Lavender Mist",
    description: "Dreamy pale purple and silver — foggy fields at dawn.",
    swatch: ["#ede3f5", "#8a6cc4", "#b89ee0"]
  },
  {
    id: "emerald",
    className: "theme-emerald",
    name: "Emerald Night",
    description: "Velvet black-green with warm gold — a rich, focused calm.",
    swatch: ["#0f1c17", "#4bc196", "#e0b452"]
  },
  {
    id: "desert",
    className: "theme-desert",
    name: "Desert Dune",
    description: "Sand, terracotta and the last warm light of dusk.",
    swatch: ["#e8d6b3", "#b25a2b", "#d38a4a"]
  }
];
const STORAGE_KEY = "study-nook-theme";
const DEFAULT_THEME = "jdm";
function applyTheme(id) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const t of THEMES) root.classList.remove(t.className);
  const theme = THEMES.find((t) => t.id === id) ?? THEMES[0];
  root.classList.add(theme.className);
}
function ThemeSwitcher() {
  const [active, setActive] = useState(DEFAULT_THEME);
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    setActive(saved);
    applyTheme(saved);
  }, []);
  const choose = (id) => {
    setActive(id);
    applyTheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
    }
  };
  const current = useMemo(
    () => THEMES.find((t) => t.id === active) ?? THEMES[0],
    [active]
  );
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        "aria-label": "Change theme",
        children: [
          /* @__PURE__ */ jsx(Palette, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: current.name }),
          /* @__PURE__ */ jsx("span", { className: "flex gap-0.5", children: current.swatch.map((c) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "h-3 w-3 rounded-full border border-border/50",
              style: { backgroundColor: c }
            },
            c
          )) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        align: "end",
        className: "max-h-[70vh] w-80 overflow-y-auto p-1",
        children: [
          /* @__PURE__ */ jsx("div", { className: "px-2 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Choose a theme" }),
          THEMES.map((t) => {
            const isActive = t.id === active;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => choose(t.id),
                className: `flex w-full items-start gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent hover:text-accent-foreground ${isActive ? "bg-accent/50" : ""}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex gap-1", children: t.swatch.map((c) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "h-6 w-3 rounded-sm border border-border/50",
                      style: { backgroundColor: c }
                    },
                    c
                  )) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate", children: t.name }),
                      isActive && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 shrink-0" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-snug", children: t.description })
                  ] })
                ]
              },
              t.id
            );
          })
        ]
      }
    )
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/60 bg-card/40 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center gap-3 px-6 py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "Lofi Study Nook" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "A warm little corner for focus, chill, and productive procrastination." })
      ] }),
      /* @__PURE__ */ jsx(ThemeSwitcher, {})
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-6 py-8", children: [
      /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(SectionTitle, { children: "Sound & Focus" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx(LofiRadio, {}),
          /* @__PURE__ */ jsx(AmbientMixer, {}),
          /* @__PURE__ */ jsx(PomodoroTimer, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(SectionTitle, { children: "Watch" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-1", children: /* @__PURE__ */ jsx(YouTubePlayer, {}) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(SectionTitle, { children: "Boredom Busters" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
          /* @__PURE__ */ jsx(DiceRoller, {}),
          /* @__PURE__ */ jsx(CoinFlip, {}),
          /* @__PURE__ */ jsx(RandomFact, {}),
          /* @__PURE__ */ jsx(ReactionGame, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
        /* @__PURE__ */ jsx(SectionTitle, { children: "Create" }),
        /* @__PURE__ */ jsx(DoodlePad, {})
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "border-t border-border/60 pt-6 text-center text-xs text-muted-foreground", children: "Made for late-night study sessions. No AI, no accounts, just tools." })
    ] })
  ] });
}
function SectionTitle({
  children
}) {
  return /* @__PURE__ */ jsx("h2", { className: "mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground", children });
}
export {
  Index as component
};
