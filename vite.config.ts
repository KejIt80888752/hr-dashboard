import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/hr-dashboard/",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-v2-[hash].js",
        chunkFileNames: "assets/[name]-v2-[hash].js",
        assetFileNames: "assets/[name]-v2-[hash].[ext]",
      },
    },
  },
  server: {
    port: 5174,
  },
})
