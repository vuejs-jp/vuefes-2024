module.exports = {
  root: true,
  env: { node: true, jest: true },
  extends: ['@vuejs-jp/eslint-config/base.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  ignorePatterns: ['.eslintrc.cjs'],
}
