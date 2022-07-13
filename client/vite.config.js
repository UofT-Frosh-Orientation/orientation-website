import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import path from 'path'

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('VITE_')) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  define: viteEnv,
  plugins: [pluginRewriteAll(), react()],
  server: {
    host: true,
    port: 3000,
  },

});
