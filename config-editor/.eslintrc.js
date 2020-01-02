module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-plusplus': "off",
    'vue/no-parsing-error':'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
