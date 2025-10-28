import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";



// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port:5178,
  },
  plugins: [react()],
}));