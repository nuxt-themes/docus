/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = ({ nuxt }) => {
  return {
    darkMode: 'class',
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        blue: colors.lightBlue,
        green: colors.emerald,
        red: colors.red,
        rose: colors.rose,
        yellow: colors.amber,
        gray: colors.trueGray
      },
      extend: {
        fontFamily: {
          sans: ['Inter var', ...defaultTheme.fontFamily.sans]
        },
        colors: {
          primary: {
            50: 'var(--primary-50)',
            100: 'var(--primary-100)',
            200: 'var(--primary-200)',
            300: 'var(--primary-300)',
            400: 'var(--primary-400)',
            500: 'var(--primary-500)',
            600: 'var(--primary-600)',
            700: 'var(--primary-700)',
            800: 'var(--primary-800)',
            900: 'var(--primary-900)'
          }
        },
        spacing: {
          18: '4.5rem',
          46: '11.5rem',
          '580px': '580px',
          '640px': '640px'
        },
        height: theme => ({
          '(full-18)': `calc(100% - ${theme('spacing.18')})`,
          '(screen-18)': `calc(100vh - ${theme('spacing.18')})`,
          '(screen-36)': `calc(100vh - ${theme('spacing.36')})`,
          '(screen-46)': `calc(100vh - ${theme('spacing.46')})`,
        }),
        maxHeight: theme => ({
          '(screen-18)': `calc(100vh - ${theme('spacing.18')})`
        }),
        minHeight: theme => ({
          'fill-available': '-webkit-fill-available'
        }),
        maxWidth: {
          '8xl': '90rem'
        },
        inset: {
          18: '4.5rem'
        },
        typography: theme => ({
          DEFAULT: {
            css: {
              maxWidth: 'none',
              color: theme('colors.gray.700'),
              '> :first-child': { marginTop: '-' },
              '> :last-child': { marginBottom: '-' },
              '&:first-child > :first-child': {
                marginTop: '0'
              },
              '&:last-child > :last-child': {
                marginBottom: '0'
              },
              'h1, h2': {
                letterSpacing: '-0.025em',
                fontWeight: theme('fontWeight.bold')
              },
              'h1, h2, h3': {
                marginTop: '1em',
                marginBottom: '0.5em'
              },
              h3: {
                fontWeight: theme('fontWeight.semibold')
              },
              p: {
                marginTop: '0.5em',
                marginBottom: '0.5em'
              },
              'h2, h3': {
                'scroll-margin-block': `${(70 + 40) / 16}rem`
              },
              'h2 code': {
                color: 'inherit',
                fontWeight: 'inherit'
              },
              'h3 code': {
                color: 'inherit',
                fontWeight: 'inherit'
              },
              'h2 > a, h3 > a': {
                color: 'inherit',
                fontWeight: 'inherit',
                '&:hover': {
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderBottomColor: theme('colors.gray.900'),
                  paddingBottom: '2px'
                }
              },
              'ul ul, ul ol, ol ul, ol ol': {
                marginTop: '0.5em',
                marginBottom: '0.5em'
              },
              li: {
                marginTop: '0.25em',
                marginBottom: '0.25em'
              },
              '> ul > li > *:last-child': {
                marginBottom: '0.5em'
              },
              a: {
                color: 'var(--primary-500)',
                fontWeight: theme('fontWeight.medium'),
                textDecoration: 'none',
                '&:hover': {
                  borderBottomWidth: 2,
                  borderBottomColor: 'var(--primary-500)',
                  paddingBottom: '1px'
                }
              },
              'a code': {
                color: 'inherit',
                fontWeight: theme('fontWeight.medium')
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
                padding: theme('padding.1'),
                color: 'inherit',
                backgroundColor: theme('colors.gray.100'),
                borderRadius: theme('borderRadius.md')
              },
              'code::before': {
                content: ''
              },
              'code::after': {
                content: ''
              },
              pre: {
                backgroundColor: theme('colors.gray.800'),
                color: theme('colors.white'),
                borderRadius: theme('borderRadius.md'),
                marginTop: 0,
                marginBottom: 0
              },
              'pre code': {
                backgroundColor: 'transparent'
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
              },
              'blockquote p:first-of-type::before': {
                content: ''
              },
              'blockquote p:last-of-type::after': {
                content: ''
              }
            }
          },
          dark: {
            css: {
              color: theme('colors.gray.50'),
              strong: {
                color: theme('colors.gray.100')
              },
              a: {
                color: 'var(--primary-400)'
              },
              'ol > li::before': {
                color: theme('colors.gray.400')
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600')
              },
              hr: {
                borderColor: theme('colors.gray.700')
              },
              blockquote: {
                color: theme('colors.gray.400'),
                borderLeftColor: theme('colors.gray.700')
              },
              h1: {
                color: theme('colors.gray.100')
              },
              h2: {
                color: theme('colors.gray.100')
              },
              h3: {
                color: theme('colors.gray.100')
              },
              h4: {
                color: theme('colors.gray.100')
              },
              'h2 code': {
                color: 'inherit',
                fontWeight: 'inherit'
              },
              'h3 code': {
                color: 'inherit',
                fontWeight: 'inherit'
              },
              'h2 > a, h3 > a': {
                color: 'inherit',
                fontWeight: 'inherit',
                '&:hover': {
                  borderBottomColor: theme('colors.gray.100')
                }
              },
              'figure figcaption': {
                color: theme('colors.gray.400')
              },
              code: {
                fontWeight: '400',
                color: 'inherit',
                backgroundColor: theme('colors.gray.800'),
                borderRadius: theme('borderRadius.md')
              },
              'code::before': {
                content: ''
              },
              'code::after': {
                content: ''
              },
              'pre code': {
                backgroundColor: 'transparent',
                color: theme('colors.gray.100')
              },
              'a code': {
                color: 'inherit',
                fontWeight: theme('fontWeight.medium')
              },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.600')
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.700')
              }
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
    ],
    purge: {
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
  }
}
