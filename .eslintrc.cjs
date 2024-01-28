module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: { react: { version: '18.2' } },
  plugins: ['prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 0,
    'react/function-component-definition': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'lines-between-class-members': 0,
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: '.',
      },
      plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
      rules: {
        '@typescript-eslint/no-misused-promises': [
          2,
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
  ],
};
