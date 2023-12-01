export default {
  '*.{(m)?js,ts?(x),(s)?css,md}': filenames =>
    `prettier --ignore-unknown --ignore-path .gitignore --write ${filenames.join(' ')}`,
  '*.{(m)?js,ts?(x)}': filenames => `eslint --fix ${filenames.join(' ')}`,
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
