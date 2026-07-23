# Lofi Study Nook

A cozy, single-page study/productivity dashboard — lofi radio, ambient sound mixer, YouTube player, pomodoro, doodle pad, dice, coin flip, reaction game, and random facts. 22 themes. No accounts, no AI, no backend.

## Stack
- TanStack Start (React 19 SSR)
- Tailwind CSS v4
- shadcn/ui + Radix + lucide-react

## Getting started

```bash
bun install    # or: npm install / pnpm install
bun run dev    # http://localhost:3000
```

## Build

```bash
bun run build
```

## Notes
- Ambient MP3s live in `public/sounds/` and are served at `/sounds/*.mp3`.
- Routes are file-based under `src/routes/`; `src/routeTree.gen.ts` is auto-generated on dev/build — do not commit or edit it.
- `src/lib/lovable-error-reporting.ts` is a no-op stub (this project was exported from Lovable).
