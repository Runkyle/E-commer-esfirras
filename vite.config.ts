import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // GitHub Pages publica em /E-commer-esfirras/; em dev roda na raiz
  base: command === 'build' ? '/E-commer-esfirras/' : '/',
  server: {
    // OneDrive pode atrasar/omitir eventos de arquivo no Windows; polling garante o HMR
    watch: { usePolling: true, interval: 300 },
  },
}))