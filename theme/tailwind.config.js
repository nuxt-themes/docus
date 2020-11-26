/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const { getColors } = require('theme-colors')

module.exports = ({ nuxt }) => {
  return {
    darkMode: 'class',
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        amber: colors.amber,
        blue: colors.blue,
        cyan: colors.cyan,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        gray: colors.coolGray,
        green: colors.green,
        indigo: colors.indigo,
        'light-blue': colors.lightBlue,
        lime: colors.lime,
        orange: colors.orange,
        pink: colors.pink,
        purple: colors.purple,
        red: colors.red,
        rose: colors.rose,
        teal: colors.teal,
        violet: colors.violet,
        yellow: colors.yellow
      },
      extend: {
        fontFamily: {
          sans: ['Inter var', ...defaultTheme.fontFamily.sans]
        },
        colors: {
          primary: getColors(nuxt.options.docs.primaryColor)
        },
        spacing: {
          18: '4.5rem'
        },
        height: theme => ({
          '(screen-18)': `calc(100vh - ${theme('spacing.18')})`
        }),
        maxHeight: theme => ({
          '(screen-18)': `calc(100vh - ${theme('spacing.18')})`
        }),
        maxWidth: {
          '8xl': '90rem'
        },
        inset: {
          18: '4.5rem'
        },
        transitionProperty: {
          padding: 'padding'
        },
        typography: theme => ({
          DEFAULT: {
            css: {
              // h2: {
              //   paddingBottom: theme('padding.2'),
              //   borderBottomWidth: '1px',
              //   borderBottomColor: theme('colors.gray.200')
              // },
              // h3: {
              //   paddingBottom: theme('padding.2'),
              //   borderBottomWidth: '1px',
              //   borderBottomColor: theme('colors.gray.200')
              // },
              // blockquote: {
              //   fontWeight: '400',
              //   color: theme('colors.gray.600'),
              //   fontStyle: 'normal',
              //   quotes: '"\\201C""\\201D""\\2018""\\2019"'
              // },
              // 'blockquote p:first-of-type::before': {
              //   content: ''
              // },
              // 'blockquote p:last-of-type::after': {
              //   content: ''
              // },
              // code: {
              //   fontWeight: '400',
              //   backgroundColor: theme('colors.gray.100'),
              //   padding: theme('padding.1'),
              //   borderWidth: 1,
              //   borderColor: theme('colors.gray.200'),
              //   borderRadius: theme('borderRadius.default')
              // },
              // 'code::before': {
              //   content: ''
              // },
              // 'code::after': {
              //   content: ''
              // },
              // 'h3 code': {
              //   fontWeight: '600'
              // },
              // 'pre code': {
              //   // fontFamily: 'DM Mono'
              // },
              // 'a code': {
              //   color: theme('colors.primary.500')
              // }
              maxWidth: 'none',
              color: theme('colors.gray.500'),
              '> :first-child': { marginTop: '-' },
              '> :last-child': { marginBottom: '-' },
              '&:first-child > :first-child': {
                marginTop: '0'
              },
              '&:last-child > :last-child': {
                marginBottom: '0'
              },
              'h1, h2': {
                letterSpacing: '-0.025em'
              },
              'h2, h3': {
                'scroll-margin-block': `${(70 + 40) / 16}rem`
              },
              // 'ul > li': {
              //   paddingLeft: '1.5em'
              // },
              // 'ul > li::before': {
              //   width: '0.75em',
              //   height: '0.125em',
              //   top: 'calc(0.875em - 0.0625em)',
              //   left: 0,
              //   borderRadius: 0,
              //   backgroundColor: theme('colors.gray.300')
              // },
              a: {
                color: theme('colors.primary.700'),
                fontWeight: theme('fontWeight.medium'),
                textDecoration: 'none',
                boxShadow: theme('boxShadow.link')
              },
              'a code': {
                color: 'inherit',
                fontWeight: 'inherit'
              },
              strong: {
                color: theme('colors.gray.900'),
                fontWeight: theme('fontWeight.medium')
              },
              'a strong': {
                color: 'inherit',
                fontWeight: 'inherit'
              },
              code: {
                fontWeight: '400',
                color: theme('colors.violet.600')
              },
              'code::before': {
              // content: 'none',
              },
              'code::after': {
              // content: 'none',
              },
              pre: {
                backgroundColor: '-',
                color: theme('colors.white'),
                borderRadius: 0,
                marginTop: 0,
                marginBottom: 0
              },
              table: {
                fontSize: theme('fontSize.sm')[0],
                lineHeight: theme('fontSize.sm')[1].lineHeight
              },
              thead: {
                color: theme('colors.gray.600'),
                borderBottomColor: theme('colors.gray.200')
              },
              'thead th': {
                paddingTop: 0,
                fontWeight: theme('fontWeight.semibold')
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.200')
              },
              'tbody tr:last-child': {
                borderBottomWidth: '1px'
              },
              'tbody code': {
                fontSize: theme('fontSize.xs')[0]
              }
            }
          },
          dark: {
            css: {
              // color: theme('colors.gray.300'),
              // '[class~="lead"]': {
              //   color: theme('colors.gray.300')
              // },
              // strong: {
              //   color: theme('colors.gray.100')
              // },
              // 'ol > li::before': {
              //   color: theme('colors.gray.400')
              // },
              // 'ul > li::before': {
              //   backgroundColor: theme('colors.gray.600')
              // },
              // hr: {
              //   borderColor: theme('colors.gray.700')
              // },
              // blockquote: {
              //   color: theme('colors.gray.400'),
              //   borderLeftColor: theme('colors.gray.700')
              // },
              // h1: {
              //   color: theme('colors.gray.100')
              // },
              // h2: {
              //   color: theme('colors.gray.100'),
              //   borderBottomColor: theme('colors.gray.800')
              // },
              // h3: {
              //   color: theme('colors.gray.100'),
              //   borderBottomColor: theme('colors.gray.800')
              // },
              // h4: {
              //   color: theme('colors.gray.100')
              // },
              // 'figure figcaption': {
              //   color: theme('colors.gray.400')
              // },
              // code: {
              //   color: theme('colors.gray.100'),
              //   backgroundColor: theme('colors.gray.800'),
              //   borderWidth: 0
              // },
              // 'a code': {
              //   color: theme('colors.primary.500')
              // },
              // thead: {
              //   color: theme('colors.gray.100'),
              //   borderBottomColor: theme('colors.gray.600')
              // },
              // 'tbody tr': {
              //   borderBottomColor: theme('colors.gray.700')
              // }
            }
          }
        })
      }
    },
    variants: {
      extend: {
        margin: ['first'],
        padding: ['first'],
        borderWidth: ['first'],
        typography: ['dark']
      }
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('tailwind-css-variables')(
        {
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
        }
      )
    ],
    purge: {
      // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
      enabled: process.env.NODE_ENV === 'production',
      content: [
        'content/**/*.md',
        path.join(nuxt.options.rootDir, 'components/**/*.vue'),
        path.join(__dirname, 'components/**/*.vue'),
        path.join(__dirname, 'layouts/**/*.vue'),
        path.join(__dirname, 'pages/**/*.vue'),
        path.join(__dirname, 'plugins/**/*.js'),
        'nuxt.config.js'
      ],
      options: {
        whitelist: ['dark-mode']
      }
    }
  }
}
