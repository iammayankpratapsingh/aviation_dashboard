import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-map-gl', 'mapbox-gl'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  resolve: {
    conditions: ['import', 'module', 'browser', 'default'],
  },
  define: {
    'process.env': {},
  },
})
