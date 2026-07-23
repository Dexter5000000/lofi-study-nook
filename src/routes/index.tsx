import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { LofiRadio } from "@/components/study/LofiRadio";
import { AmbientMixer } from "@/components/study/AmbientMixer";
import { YouTubePlayer } from "@/components/study/YouTubePlayer";
import { DiceRoller } from "@/components/study/DiceRoller";
import { CoinFlip } from "@/components/study/CoinFlip";
import { RandomFact } from "@/components/study/RandomFact";
import { DoodlePad } from "@/components/study/DoodlePad";
import { ReactionGame } from "@/components/study/ReactionGame";
import { PomodoroTimer } from "@/components/study/PomodoroTimer";
import { ThemeSwitcher } from "@/components/study/ThemeSwitcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lofi Study Nook — focus, chill, procrastinate on purpose" },
      {
        name: "description",
        content:
          "A cozy study dashboard: lofi radio, an ambient sound mixer, YouTube player, doodle pad, dice, reaction test, pomodoro, and fun distractions.",
      },
      { property: "og:title", content: "Lofi Study Nook" },
      {
        property: "og:description",
        content:
          "Lofi radio, ambient sounds, YouTube, doodle pad, dice, reaction test and more — one warm little study nook.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    // Warm up YouTube's TLS + DNS in idle time so hitting play on a station
    // starts the stream noticeably faster (skips ~200-500ms of handshakes).
    links: [
      { rel: "preconnect", href: "https://www.youtube.com", crossOrigin: "" },
      { rel: "preconnect", href: "https://www.youtube-nocookie.com", crossOrigin: "" },
      { rel: "preconnect", href: "https://i.ytimg.com", crossOrigin: "" },
      { rel: "preconnect", href: "https://s.ytimg.com", crossOrigin: "" },
      { rel: "dns-prefetch", href: "https://googlevideo.com" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-card/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold tracking-tight">Lofi Study Nook</h1>
            <p className="text-xs text-muted-foreground">
              A warm little corner for focus, chill, and productive procrastination.
            </p>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-6">
          <SectionTitle>Sound & Focus</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <LofiRadio />
            <AmbientMixer />
            <PomodoroTimer />
          </div>
        </section>

        <section className="mb-6">
          <SectionTitle>Watch</SectionTitle>
          <div className="grid gap-6 md:grid-cols-1">
            <YouTubePlayer />
          </div>
        </section>

        <section className="mb-6">
          <SectionTitle>Boredom Busters</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DiceRoller />
            <CoinFlip />
            <RandomFact />
            <ReactionGame />
          </div>
        </section>

        <section className="mb-10">
          <SectionTitle>Create</SectionTitle>
          <DoodlePad />
        </section>

        <footer className="border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          Made for late-night study sessions. No AI, no accounts, just tools.
        </footer>
      </main>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </h2>
  );
}
