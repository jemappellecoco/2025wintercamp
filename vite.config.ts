import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 載入 .env / .env.local 裡的變數
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 如果要 deploy 到 GitHub Pages: https://jemappellecoco.github.io/2025wintercamp/
    base: '/2025wintercamp/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // 👇 如果你要把 GEMINI_API_KEY 傳進前端可以這樣做
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
  };
});
