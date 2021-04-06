module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['prettier'],
  extends: ['@nuxtjs', 'prettier', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  rules: {
    // Vue rules
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false
      }
    ],
    'vue/singleline-html-element-content-newline': [0],
    'vue/multiline-html-element-content-newline': [0],
    'vue/html-self-closing': [0],
    'vue/no-v-html': [0],
    'vue/max-attributes-per-line': [0],
    'vue/html-closing-bracket-newline': [0],
    'vue/html-indent': [0],
    // Prettier rules
    'no-console': [1],
    'space-before-function-paren': [0],
    'arrow-parens': [0]
  }
}
