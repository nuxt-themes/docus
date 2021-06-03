const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          // ...defaultTheme.fontFamily.sans
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
        ]
      },
      fontSize: {
        ss: '0.666666rem'
      },
      colors: {
        nuxt: {
          gray: '#2F495E',
          lightgreen: '#00C58E',
          green: '#108775'
        },
        primary: {
          base: '#00C58E',
          light: '#00E0A1',
          dark: '#07A377'
        },
        light: {
          surface: '#F8FAFC',
          onSurfacePrimary: '#2F495E',
          onSurfaceSecondary: '#606F7B',
          elevatedSurface: defaultTheme.colors.white,
          border: defaultTheme.colors.gray['300']
        },
        dark: {
          surface: '#2C3E50',
          onSurfacePrimary: '#F5F7FA',
          onSurfaceSecondary: '#B8C2CC',
          elevatedSurface: '#2F495E',
          border: defaultTheme.colors.gray['600']
        }
      },
      fill: theme => ({
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-lightgreen': theme('colors.nuxt.lightgreen'),
        'nuxt-green': theme('colors.nuxt.green')
      }),
      stroke: theme => ({
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-lightgreen': theme('colors.nuxt.lightgreen'),
        'nuxt-green': theme('colors.nuxt.green')
      }),
      boxShadow: {
        nuxt: '0px 0px 8px rgba(0, 0, 0, 0.101562)',
        reverse: '0 -2px 4px 0 rgba(0, 0, 0, 0.05)',
        'inset-nuxt': 'inset 0px 0px 8px rgba(0, 0, 0, 0.101562)'
      },
      inset: {
        24: '6rem'
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      transitionTimingFunction: {
        'ease-in-material': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out-material': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out-material': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-out-material-sharp': 'cubic-bezier(0.4, 0, 0.6, 1)'
      }
    }
  },
  variants: {
    display: ['responsive', 'after'],
    margin: ['responsive', 'after'],
    width: ['responsive', 'after'],
    borderWidth: ['responsive', 'after'],
    borderRadius: ['responsive', 'after'],
    borderColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'light',
      'after',
      'light:after',
      'dark:after'
    ],
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'light',
      'dark:hover',
      'light:hover'
    ],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'group-hover',
      'dark',
      'light',
      'dark:hover',
      'light:hover'
    ]
  },
  plugins: [
    plugin(function ({ addVariant, theme, e, prefix, config }) {
      const colorModeVariants = ['light', 'dark']
      colorModeVariants.forEach(mode => {
        addVariant(mode, ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${mode}-mode .${e(`${mode}${separator}${className}`)}`
          })
        })
      })
      const pseudoVariants = ['after', 'before']
      pseudoVariants.forEach(pseudo => {
        addVariant(pseudo, ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${e(`${pseudo}${separator}${className}`)}::${pseudo}`
          })
        })
      })
      // generate chained color mode and pseudo variants
      colorModeVariants.forEach(mode => {
        pseudoVariants.forEach(pseudo => {
          addVariant(`${mode}:${pseudo}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
              return `.${mode}-mode .${e(
                `${mode}${separator}${pseudo}${separator}${className}`
              )}::${pseudo}`
            })
          })
        })
      })
      // states for color modes
      const states = ['hover']
      colorModeVariants.forEach(mode => {
        states.forEach(state => {
          addVariant(`${mode}:${state}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
              return `.${mode}-mode .${e(
                `${mode}${separator}${state}${separator}${className}`
              )}:${state}`
            })
          })
        })
      })
    })
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      whitelist: ['dark-mode', 'light-mode']
    }
  }
}
