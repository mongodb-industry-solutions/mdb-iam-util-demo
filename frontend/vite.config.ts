import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from outside the container
    port: 5173,      // Ensure the correct port is used
    strictPort: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
