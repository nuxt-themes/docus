const path = require('path')
const defu = require('defu')

module.exports = ({ nuxt, cssModule }) => {
  const configFactory = require('./tailwind.config')
  return cssModule === 'nuxt-windicss' ? windicss({ nuxt, configFactory }) : tailwind({ nuxt, configFactory })
}

function windicss ({ nuxt, configFactory }) {
  const { hook, options } = nuxt
  const defaultTheme = nuxt.resolver.requireModule('windicss/defaultTheme')
  const colors = nuxt.resolver.requireModule('windicss/colors')
  const config = configFactory({ nuxt, colors, defaultTheme })
  const theme = (key) => {
    const keys = key.split('.')
    return keys.reduce((res, _key) => res[_key], defaultTheme)
  }
  config.theme.extend.typography = config.theme.extend.typography(theme)
  config.plugins = [
    require('windicss/plugin/typography')(),
    require('windicss/plugin/aspect-ratio')
  ]

  hook('windicss:config', function (defaultConfig) {
    defaultConfig.config = defu(defaultConfig.config || {}, config)

    // include docus directory in scan process
    defaultConfig.scan.include = defaultConfig.scan.include || []
    defaultConfig.scan.include.push('node_modules/docus')

    defaultConfig.scan.dirs.push(path.join(__dirname, 'components/'))
    defaultConfig.scan.dirs.push(path.join(__dirname, 'layouts/'))
    defaultConfig.scan.dirs.push(path.join(__dirname, 'pages/'))
    defaultConfig.scan.dirs.push(path.join(__dirname, 'plugins/'))
    defaultConfig.scan.dirs.push(path.join(__dirname, 'utils/'))
    defaultConfig.scan.dirs.push(path.resolve(options.srcDir, options.publicRuntimeConfig.contentDir))
  })

  return config
}

function tailwind ({ nuxt, configFactory }) {
  const { options, hook } = nuxt
  const defaultTheme = nuxt.resolver.requireModule('tailwindcss/defaultTheme')
  const colors = nuxt.resolver.requireModule('tailwindcss/colors')
  const config = configFactory({ nuxt, colors, defaultTheme })
  config.plugins = [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-css-variables')({
      colors: 'color',
      screens: false,
      fontFamily: false,
      fontSize: false,
      fontWeight: false,
      lineHeight: false,
      letterSpacing: false,
      backgroundSize: false,
      borderWidth: false,
      borderRadius: false,
      width: false,
      height: false,
      minWidth: false,
      minHeight: false,
      maxWidth: false,
      maxHeight: false,
      padding: false,
      margin: false,
      boxShadow: false,
      zIndex: false,
      opacity: false
    })
  ]
  config.purge = {
    content: [
      path.join(__dirname, 'components/**/*.vue'),
      path.join(__dirname, 'layouts/**/*.vue'),
      path.join(__dirname, 'pages/**/*.vue'),
      path.join(__dirname, 'plugins/**/*.js'),
      path.join(__dirname, 'utils/**/*.js'),
      'nuxt.config.js'
    ],
    options: {
      safelist: []
    }
  }

  hook('tailwindcss:config', function (defaultConfig) {
    Object.assign(defaultConfig, defu(defaultConfig, config))
    // Add content/**/*.md to purge
    defaultConfig.purge.content.push(path.resolve(options.srcDir, options.publicRuntimeConfig.contentDir, '**/*.md'))
  })
  return config
}
