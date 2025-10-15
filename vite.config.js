/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh and in-browser error overlays
      fastRefresh: true,
      jsxRuntime: "automatic",
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
    port: 5173,
    hmr: {
      overlay: true, // Ensures red error overlay is visible
    },
  },
});
