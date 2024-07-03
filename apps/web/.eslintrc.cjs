module.exports = {
  root: true,
  extends: ['@vuejs-jp/eslint-config/vue-library.js'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'index',
          'console',
          'default',
          'events',
          'error',
          'invite',
          'List',
          'Page',
          'privacy',
          'register',
          'users',
          '[id]',
        ],
      },
    ],
  },
}
