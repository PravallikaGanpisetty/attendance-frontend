<<<<<<< HEAD
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
=======

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
>>>>>>> c0cf8636331290172763a8116614229b95f805b4
