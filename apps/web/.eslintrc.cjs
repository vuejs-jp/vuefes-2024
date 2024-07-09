module.exports = {
  root: true,
  env: {
    'cypress/globals': true,
  },
  extends: ['@vuejs-jp/eslint-config/vue-library.js'],
  plugins: ['cypress'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'index',
          'complete',
          'console',
          'default',
          'events',
          'error',
          'invite',
          'List',
          'Page',
          'privacy',
          'register',
          'share',
          'users',
          '[id]',
        ],
      },
    ],
  },
}
