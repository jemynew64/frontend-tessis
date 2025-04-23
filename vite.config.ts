import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173, // Para desarrollo local (Docker o tu máquina)
    watch: {
      usePolling: true
    },
    hmr: {
      clientPort: 5173
    }
  },
  preview: {
    host: true,  // Esto permite recibir conexiones externas
    port: 80     // Render requiere el puerto 80 en producción
  }
})
