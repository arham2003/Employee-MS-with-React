import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Custom output directory for Netlify
    assetsDir: 'assets', // Directory for assets within the build folder
  },
  server: {
    port: 3000, // Optional: Specify a dev server port
    open: true, // Automatically open in browser during development
  },
});
