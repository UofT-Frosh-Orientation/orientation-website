import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { dependencies } from './package.json';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', '@react-pdf/renderer'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [pluginRewriteAll(), react()],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
