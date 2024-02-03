// This configuration only applies to the package manager root.
module.exports = {
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: ['@vuejs-jp/eslint-config/base.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
