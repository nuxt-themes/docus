module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  extends: ['@nuxtjs', 'eslint-config-prettier'],
  rules: {
    // Only allow console log and debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    'no-console': process.env.PRE_COMMIT
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off',

    // Prettier adds slash at end and so we need to turn this off or it will conflict
    'vue/html-self-closing': 'off',

    // Prettier has an indent already set so this conflicts with it
    'vue/html-indent': 'off'
  }
}
