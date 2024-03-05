module.exports = {
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
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'error',
  },
}
