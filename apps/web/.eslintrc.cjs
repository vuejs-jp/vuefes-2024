module.exports = {
  root: true,
  extends: ['@vuejs-jp/eslint-config/vue-library.js'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'index',
          'default',
          'error',
          'privacy',
          'register',
          'users',
          'events',
          'Provider',
          '[id]',
        ],
      },
    ],
  },
}
