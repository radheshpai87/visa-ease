import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/visa_system/', // 👈 This is important for GitHub Pages
  plugins: [
    tailwindcss(),
    react()
  ],
})
