import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Default to 5174 so it does not fight with another Vite on 5173.
    port: 5174,
    strictPort: true,
    host: true,
  },
})
