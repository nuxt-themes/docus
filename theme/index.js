const { resolveConfig } = require('@nuxt/theme')

module.exports = function docsTheme (userConfig) {
  const c = resolveConfig({
    extends: require.resolve('./nuxt.config'),
    ...userConfig
  })
  return c
}
