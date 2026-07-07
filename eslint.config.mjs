import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-config-next';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['.next/', 'node_modules/', 'out/', 'build/'],
  },
  js.configs.recommended,
  ...next,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    settings: { react: { version: '18.2' } },
    rules: {
      'react/function-component-definition': 'off',
      'import/prefer-default-export': 'off',
      'class-methods-use-this': 'off',
      'lines-between-class-members': 'off',
      'no-case-declarations': 'off',
      // Migrating every <img> to next/image is out of scope for this lint migration:
      // it would touch many unrelated components and risks altering rendered output
      // (dimensions/markup), which would break the image-snapshot suite that must
      // stay green without updating snapshots.
      '@next/next/no-img-element': 'off',
    },
  },
  {
    // Next.js App Router files under app/ intentionally co-export non-component
    // values (metadata, generateMetadata, viewport, etc.) alongside the default
    // component, per framework convention - the Vite-era Fast Refresh rule below
    // only applies to component modules under src/.
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-refresh': reactRefresh },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__mocks__/*.{ts,tsx}', '**/vitest.setup.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
  prettierConfig
);
