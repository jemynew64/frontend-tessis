import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    },
    hmr: {
      clientPort: 5173
    }
  },
  preview: {
    host: true,
    port: 80,
    strictPort: true,
    allowedHosts: ['frontend-tessis.onrender.com']  // ✅ Esto desbloquea tu host de Render
  }
})
