module.exports = {
  extends: [
    'eslint:recommended',
    'eslint-config-turbo',
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    'prettier',
  ],
  plugins: ['only-warn', 'vuejs-accessibility', '@typescript-eslint'],
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
