// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Merge all lucide-react icons into ONE chunk instead of 12+ separate
          // per-icon chunks. Each icon is tiny (~1 KB) so the extra HTTP requests
          // and JS execution overhead dwarf the bundle savings.
          manualChunks(id) {
            if (id.includes("node_modules/lucide-react")) {
              return "lucide-icons";
            }
          },
        },
      },
    },
  },
});
