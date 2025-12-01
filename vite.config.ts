import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';

export default defineConfig({
  // GitHub Pages 路徑： https://jemappellecoco.github.io/2025wintercamp/
  base: '/2025wintercamp/',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  plugins: [react()],

  resolve: {
    alias: {
      // 這裡維持跟原本一樣：@ 指到專案根目錄
      // 所以你可以 import '@/components/xxx'
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
