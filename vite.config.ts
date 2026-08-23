import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/minidemo/",
  plugins: [react()],
  server: {
    port: 4178,
    host: "127.0.0.1",
  },
  preview: {
    port: 4178,
    host: "127.0.0.1",
  },
  build: {
    target: "es2022",
  },
});
