import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necesario para exponer el servidor fuera del contenedor
    port: 5173, // Puerto que estás usando
    watch: {
      usePolling: true // Obligatorio para Docker en Windows
    },
    hmr: {
      clientPort: 5173 // Importante para que HMR funcione correctamente
    }
  },
  preview: {
    port: 5173
  }
})