import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig(({ command, mode }) => {
  const port = parseInt(process.env.VITE_PORT, 10);
  const isProd = mode === "production";

  return {
    plugins: [react()],
    base: command === "serve" ? "/TraceabilitySystem" : "/",
    server: {
      strictPort: true,
      host: true,
      port: port,
    },
  };
});
