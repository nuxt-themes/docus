module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ['prettier'],
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
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
    'arrow-parens': [0],
    curly: [0],
    'keyword-spacing': [0],
    // TODO: Remove all configs below
    //
    // This is done in order to avoid src/admin/app
    // Errors on multiple roots, as this is a Vue 3 project
    // And Vue 3 allows multiple roots.
    //
    // Note:
    // If you still have the error displayed, it means Vetur is trying
    // To lint your file with Vue 2 configuration, to avoid that
    // Add:
    // 'vetur.validation.template': false,
    // 'vetur.validation.script': false,
    // 'vetur.validation.style': false,
    // To your `settings.json`, from VSCode.
    //
    'vue/no-multiple-template-root': 0
  }
}
