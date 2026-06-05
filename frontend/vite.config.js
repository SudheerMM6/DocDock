import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// eslint-disable-next-line no-undef
const analyze = process.env.ANALYZE === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    analyze && visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: { port: 5173 }
})
