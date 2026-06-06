import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is set to './' so the built app works both on a plain static host
// and under a subpath like GitHub Pages (https://user.github.io/streaming4kids/).
export default defineConfig({
  plugins: [react()],
  base: './',
})
