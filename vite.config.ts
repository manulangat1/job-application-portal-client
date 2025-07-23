import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   allowedHosts: ["all"],
  // },
  // server: {
  //   host: true, // needed to allow external access
  //   // allowedHosts: "all",
  //   allowedHosts: ["all"],
  //   // allowedHosts: ["jobs.kipchirchirlangat.com"], // <-- Add your domain here
  // },
});
