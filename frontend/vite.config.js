import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base:'/',
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    },
    historyApiFallback: true
  },
  build: {
    outDir: resolve(__dirname, '../app/static/'), 
    assetsDir: 'assets',
    emptyOutDir: true, // Clears old build files before output
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html') // entry point
      }
    }
  }
})
