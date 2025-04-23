import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173, // ✅ Solo para desarrollo local en Docker
    watch: {
      usePolling: true
    },
    hmr: {
      clientPort: 5173
    }
  },
  preview: {
    host: true,         // ✅ Esto permite que se sirva en 0.0.0.0
    port: 80             // ✅ Render requiere que el contenedor escuche en el 80
  }
})
