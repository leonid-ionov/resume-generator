const HookType = process.env.HUSKY_GIT_PARAMS;

const configMap = {
  'pre-commit': {
    '*.{(m)?js,ts?(x),(s)?css,md}': filenames =>
      `prettier --ignore-unknown --ignore-path .gitignore --write ${filenames.join(' ')}`,
  },
  'pre-push': {
    '*.{(m)?js,ts?(x)}': filenames => `eslint --fix ${filenames.join(' ')}`,
    '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  },
};
export default configMap[HookType];
