module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  extends: ['@oasis-app-wallet/eslint-config/index.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
