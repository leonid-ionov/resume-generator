import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
