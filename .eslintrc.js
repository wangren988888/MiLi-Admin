module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'no-undef': 'off',
    camelcase: 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
