import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/img": "https://apricot-antelope-ring.cyclic.app",
      // "/img": "https://tourme.onrender.com",
      // "/img": "http://127.0.0.1:8000",
    },
  },
  plugins: [react()],
});
