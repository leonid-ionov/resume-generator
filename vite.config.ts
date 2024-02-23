import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const baseUrlMap: Record<string, string> = {
  development: '/',
  production: '/',
  'github-pages': '/resume-generator/',
};

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  base: baseUrlMap?.[process.env.NODE_ENV],
  assetsInclude: ['./src/assets/fonts/*.ttf', './src/assets/icons/*.svg'],
  server: {
    port: 555,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  resolve: {
    alias: {
      styles: resolve(__dirname, './src/styles'),
    },
  },
});
