import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  build: {
    outDir: resolve(__dirname, '../app/static'), 
    emptyOutDir: true, // Clears old build files before output
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html') // entry point
      }
    }
  }
})
