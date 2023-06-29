import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/users": {
  //       target: `http://localhost:8077`,
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //     },
  //   },
  //   cors: {
  //     origin: "*",
  //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //     preflightContinue: false,
  //     optionsSuccessStatus: 204,
  //     allowedHeaders: "*",
  //   },
  // },
});
