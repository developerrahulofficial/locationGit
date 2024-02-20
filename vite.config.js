import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "process.env.VITE_AUTH0_DOMAIN": JSON.stringify(process.env.VITE_AUTH0_DOMAIN),
    "process.env.VITE_AUTH0_CLIENT_ID": JSON.stringify(process.env.VITE_AUTH0_CLIENT_ID),
  },
});
