/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import vitestAssetsResolverPlugin from './src/tests/plugins/vitestAssetsResolverPlugin.ts';

export default defineConfig({
  assetsInclude: ['./src/assets/fonts/*.ttf', './src/assets/icons/*.svg', './src/assets/images/*.png'],
  plugins: [react(), vitestAssetsResolverPlugin()],
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
  test: {
    globals: true,
    pool: 'forks',
    css: true,
    setupFiles: './src/tests/vitest.setup.ts',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
});
