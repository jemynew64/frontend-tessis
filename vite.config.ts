// vite.config.ts o vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 80,
    strictPort: true,
    /**
     * ⚠️ allowedHosts ya NO es parte del tipo oficial
     * así que para Vite 6.3.2, deberías **no ponerlo**
     * y en su lugar usar:
     */
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
