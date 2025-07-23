import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // needed to allow external access
    allowedHosts: ["jobs.kipchirchirlangat.com"], // <-- Add your domain here
  },
});
