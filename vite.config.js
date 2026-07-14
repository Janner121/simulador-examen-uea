import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' genera rutas relativas para que el build funcione
// alojado en cualquier subruta de GitHub Pages sin configuración extra.
export default defineConfig({
  plugins: [react()],
  base: './',
})
