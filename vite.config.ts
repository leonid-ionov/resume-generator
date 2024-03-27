/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { baseUrlMap } from './src/constants/environmentMaps.ts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.DEPLOY_ENVIRONMENT ? baseUrlMap[env.DEPLOY_ENVIRONMENT] : baseUrlMap?.[env.NODE_ENV];
  return {
    appType: 'spa',
    base,
    assetsInclude: ['./src/assets/fonts/*.ttf', './src/assets/icons/*.svg', './src/assets/icons/*.png'],
    server: {
      port: 555,
    },
    define: {
      'process.env': env,
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
