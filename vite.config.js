// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.',   // force root at repo root
  base: '/',
  plugins: [react()],
})
