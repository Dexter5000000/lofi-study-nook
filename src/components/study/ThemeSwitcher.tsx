import { useEffect, useMemo, useState } from "react";
import { Palette, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = {
  id: string;
  className: string;
  name: string;
  description: string;
  swatch: [string, string, string];
};

export const THEMES: Theme[] = [
  {
    id: "jdm",
    className: "theme-jdm",
    name: "JDM Poster",
    description: "Silver garage, crimson accent — the original tuner-poster vibe.",
    swatch: ["#d3d5d8", "#4b4d51", "#d63838"],
  },
  {
    id: "tokyo",
    className: "theme-tokyo",
    name: "Tokyo Neon",
    description: "Rain-slick streets, magenta signs and cyan glow after midnight.",
    swatch: ["#1a1030", "#f062a6", "#3dd6ff"],
  },
  {
    id: "cafe",
    className: "theme-cafe",
    name: "Cozy Cafe",
    description: "Latte foam, warm oak, espresso — a rainy-afternoon reading nook.",
    swatch: ["#f2e7d4", "#8b6b4a", "#c88a52"],
  },
  {
    id: "forest",
    className: "theme-forest",
    name: "Forest Study",
    description: "Deep pine, moss and a single reading lamp in the woods.",
    swatch: ["#1e2a22", "#7ec27a", "#c9b56b"],
  },
  {
    id: "vapor",
    className: "theme-vapor",
    name: "Vaporwave Sunset",
    description: "Pastel purples, peach sky, chrome palm trees on the horizon.",
    swatch: ["#3a2450", "#ff9ad0", "#7fe0d4"],
  },
  {
    id: "ocean",
    className: "theme-ocean",
    name: "Midnight Ocean",
    description: "Navy depths, moon-silvered water, quiet lighthouse teal.",
    swatch: ["#0f1d33", "#59b6d9", "#4ec3b8"],
  },
  {
    id: "sakura",
    className: "theme-sakura",
    name: "Sakura Bloom",
    description: "Cream paper and cherry-blossom pink — soft spring afternoons.",
    swatch: ["#fff0ec", "#ef8fa1", "#f7c6d2"],
  },
  {
    id: "academia",
    className: "theme-academia",
    name: "Dark Academia",
    description: "Old library sepia, burgundy leather and worn brass.",
    swatch: ["#2b241d", "#a34a2b", "#c9a25e"],
  },
  {
    id: "terminal",
    className: "theme-terminal",
    name: "Retro Terminal",
    description: "CRT scanlines and phosphor-green text on jet black.",
    swatch: ["#0d1a10", "#5fff8f", "#1f3325"],
  },
  {
    id: "pastel",
    className: "theme-pastel",
    name: "Pastel Dream",
    description: "Marshmallow lavender, mint and baby-blue — impossibly gentle.",
    swatch: ["#f4edff", "#b6a4ea", "#a8e0d3"],
  },
  {
    id: "autumn",
    className: "theme-autumn",
    name: "Autumn Leaves",
    description: "Rust, amber and warm oak — sweater-weather study energy.",
    swatch: ["#2f2418", "#e08a3c", "#c74a1e"],
  },
  {
    id: "arctic",
    className: "theme-arctic",
    name: "Arctic Frost",
    description: "Snow paper and icy blue — crisp, quiet, wide open.",
    swatch: ["#f5f8fc", "#3b7fc0", "#9ec7e0"],
  },
  {
    id: "matcha",
    className: "theme-matcha",
    name: "Matcha Latte",
    description: "Cream ceramic and stone-ground matcha green.",
    swatch: ["#eee7d4", "#7aa15a", "#a7c48a"],
  },
  {
    id: "blueprint",
    className: "theme-blueprint",
    name: "Blueprint",
    description: "Architect's paper — deep blue field, glowing cyan lines.",
    swatch: ["#1e3a70", "#a8dcf5", "#c0e7ff"],
  },
  {
    id: "peach",
    className: "theme-peach",
    name: "Peach Fuzz",
    description: "Warm coral and cream — soft morning sun through curtains.",
    swatch: ["#ffe6d1", "#ee8a5a", "#f2b48a"],
  },
  {
    id: "mono",
    className: "theme-mono",
    name: "Monochrome",
    description: "Pure paper, ink black, zero distractions.",
    swatch: ["#ffffff", "#111111", "#cccccc"],
  },
  {
    id: "cyber",
    className: "theme-cyber",
    name: "Cyber Void",
    description: "Pitch black, electric violet and laser-lime highlights.",
    swatch: ["#0a0512", "#b34dff", "#c8ff3d"],
  },
  {
    id: "rosegold",
    className: "theme-rosegold",
    name: "Rose Gold",
    description: "Dusty pink and champagne — quiet luxury, gentle contrast.",
    swatch: ["#f3e2d6", "#c78a76", "#dcb28a"],
  },
  {
    id: "solar",
    className: "theme-solar",
    name: "Solar Flare",
    description: "Charcoal night torn open by fiery yellow-orange.",
    swatch: ["#1b1712", "#f2b62b", "#e56b26"],
  },
  {
    id: "lavender",
    className: "theme-lavender",
    name: "Lavender Mist",
    description: "Dreamy pale purple and silver — foggy fields at dawn.",
    swatch: ["#ede3f5", "#8a6cc4", "#b89ee0"],
  },
  {
    id: "emerald",
    className: "theme-emerald",
    name: "Emerald Night",
    description: "Velvet black-green with warm gold — a rich, focused calm.",
    swatch: ["#0f1c17", "#4bc196", "#e0b452"],
  },
  {
    id: "desert",
    className: "theme-desert",
    name: "Desert Dune",
    description: "Sand, terracotta and the last warm light of dusk.",
    swatch: ["#e8d6b3", "#b25a2b", "#d38a4a"],
  },
];

const STORAGE_KEY = "study-nook-theme";
const DEFAULT_THEME = "jdm";

function applyTheme(id: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const t of THEMES) root.classList.remove(t.className);
  const theme = THEMES.find((t) => t.id === id) ?? THEMES[0];
  root.classList.add(theme.className);
}

export function ThemeSwitcher() {
  const [active, setActive] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) ||
      DEFAULT_THEME;
    setActive(saved);
    applyTheme(saved);
  }, []);

  const choose = (id: string) => {
    setActive(id);
    applyTheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  };

  const current = useMemo(
    () => THEMES.find((t) => t.id === active) ?? THEMES[0],
    [active],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Change theme"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">{current.name}</span>
          <span className="flex gap-0.5">
            {current.swatch.map((c) => (
              <span
                key={c}
                className="h-3 w-3 rounded-full border border-border/50"
                style={{ backgroundColor: c }}
              />
            ))}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-[70vh] w-80 overflow-y-auto p-1"
      >
        <div className="px-2 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Choose a theme
        </div>
        {THEMES.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => choose(t.id)}
              className={`flex w-full items-start gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent hover:text-accent-foreground ${
                isActive ? "bg-accent/50" : ""
              }`}
            >
              <div className="mt-0.5 flex gap-1">
                {t.swatch.map((c) => (
                  <span
                    key={c}
                    className="h-6 w-3 rounded-sm border border-border/50"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate">{t.name}</span>
                  {isActive && <Check className="h-3.5 w-3.5 shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {t.description}
                </p>
              </div>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
