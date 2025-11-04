import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // tell Vite to use the current folder
  build: {
    rollupOptions: {
      input: './index.html', // ensure correct entry file
    },
  },
})
