import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Target server URL
        changeOrigin: true, // Change the origin of the request to the target URL
        secure: false, // Disable SSL verification if needed
      },
    },
  },
  plugins: [react()],
});
