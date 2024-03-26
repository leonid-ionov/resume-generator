/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { baseUrlMap } from './src/constants/environmentMaps.ts';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    appType: 'spa',
    base: baseUrlMap?.[env.DEPLOY_ENVIRONMENT ?? env.NODE_ENV],
    assetsInclude: ['./src/assets/fonts/*.ttf', './src/assets/icons/*.svg', './src/assets/icons/*.png'],
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
    test: {
      globals: true,
      pool: 'forks',
      setupFiles: './src/tests/vitest.setup.ts',
      include: ['**/*.test.ts', '**/*.test.tsx'],
      environment: 'jsdom',
      environmentOptions: {
        jsdom: {
          resources: 'usable',
        },
      },
    },
  };
});
