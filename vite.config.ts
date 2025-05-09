import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,
    strictPort: true,
    allowedHosts: ["ade1-109-172-200-146.ngrok-free.app"],
    cors: {
      origin: true,
      credentials: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
})

