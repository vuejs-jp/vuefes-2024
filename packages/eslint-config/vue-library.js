module.exports = {
  extends: [
    './base.js',
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  plugins: ['vuejs-accessibility'],
  parser: 'vue-eslint-parser',
  rules: {
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
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
