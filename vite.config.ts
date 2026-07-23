import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 3000, host: "0.0.0.0" },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    TanStackRouterVite(),
    viteReact(),
  ],
});
