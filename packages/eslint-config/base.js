module.exports = {
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo", 'plugin:vue/vue3-recommended', 'plugin:vuejs-accessibility/recommended'],
  plugins: ['only-warn', 'vuejs-accessibility', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
