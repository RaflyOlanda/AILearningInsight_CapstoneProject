// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. IMPORT PATH

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to the backend during dev so Tailwind/Vite stay in charge of the UI
      '/dashboard': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/journeys': 'http://localhost:5000',
      '/insights': 'http://localhost:5000',
    },
  },
})