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
          'Credit',
          'Date',
          'Dialog',
          'Header',
          'Icon',
          'Logo',
          'Namecard23',
          'Namecard24',
          'Product',
          'Speaker',
          'Tab',
          'Tag',
          'Time',
          'Title',
          'Track',
          'Typography',
        ],
      },
    ],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        'required': {
          'some': ['nesting', 'id'],
        },
        'allowChildren': false,
      },
    ],
  },
}
