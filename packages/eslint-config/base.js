module.exports = {
  env: { browser: true, jest: true, node: true },
  extends: [
    'eslint:recommended',
    'eslint-config-turbo',
    'prettier',
  ],
  plugins: ['only-warn', '@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-unused-vars': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'error',
  },
}
