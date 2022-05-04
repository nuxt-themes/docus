module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', '@antfu', 'plugin:prettier-vue/recommended', 'prettier'],
  settings: {
    'import/ignore': ['vue'],
  },
  rules: {
    semi: 'error',
    'antfu/if-newline': 0,
    'vue/static-class-names-order': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-component-is': 'off',
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/comma-dangle': ['error'],
    'comma-dangle': 'error',
    'no-unused-vars': 0,
    'prettier-vue/prettier': [
      'error',
      {
        // Override all options of `prettier` here
        // @see https://prettier.io/docs/en/options.html
        // plugins: ['prettier-plugin-tailwindcss'],
        printWidth: 999,
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
  },
}
