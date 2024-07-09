module.exports = {
  root: true,
  extends: ['@vuejs-jp/eslint-config/vue-library.js'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'Accordion',
          'Avatar',
          'Button',
          'Comment',
          'Date',
          'Dialog',
          'Header',
          'Icon',
          'Logo',
          'Speaker',
          'Tab',
          'Time',
          'Title',
          'Typography',
        ],
      },
    ],
  }
}
