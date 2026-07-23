import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

/** Remove the `crossorigin` attribute Vite adds to same-origin CSS links,
 *  which can cause the stylesheet to be blocked by strict privacy blockers. */
const removeCssCrossorigin = () => ({
  name: "remove-css-crossorigin",
  transformIndexHtml(html: string) {
    return html.replace(
      /<link([^>]*?) rel="stylesheet" crossorigin([^>]*?)>/g,
      '<link$1 rel="stylesheet"$2>'
    );
  },
});

export default defineConfig({
  server: { port: 3000, host: "0.0.0.0" },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    TanStackRouterVite(),
    viteReact(),
    removeCssCrossorigin(),
  ],
});
