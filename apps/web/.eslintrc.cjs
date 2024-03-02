module.exports = {
  root: true,
  extends: ['@vuejs-jp/eslint-config/base.js'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
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
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
}
