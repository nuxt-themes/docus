/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

module.exports = ({ colors, defaultTheme }) => {
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
        gray: colors.warmGray
      },
      extend: {
        screens: {
          xs: '414px'
        },
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
          '(screen-46)': `calc(100vh - ${theme('spacing.46')})`
        }),
        maxHeight: theme => ({
          '(screen-18)': `calc(100vh - ${theme('spacing.18')})`
        }),
        minHeight: theme => ({
          'fill-available': '-webkit-fill-available'
        }),
        maxWidth: {
          '8xl': '90rem',
          '1/2': '50%'
        },
        minWidth: {
          '1/2': '50%'
        },
        inset: {
          18: '4.5rem'
        },
        typography: theme => ({
          DEFAULT: {
            css: {
              maxWidth: 'none',
              color: colors.gray[700],
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
                marginTop: '1.5em',
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
                position: 'relative',
                code: {
                  border: '1px dashed transparent',
                  position: 'relative',
                  zIndex: 0
                },
                '&:hover': {
                  borderBottomWidth: 0,
                  paddingBottom: 0,
                  code: {
                    borderColor: colors.warmGray[500]
                  }
                },
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 'calc(100% + 4px)'
                },
                '&:hover:before': {
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderBottomColor: colors.warmGray[900]
                },
                'code:before': {
                  content: '""',
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  zIndex: -1,
                  width: 'calc(100% + 8px)',
                  height: 'calc(100% + 8px)',
                  backgroundColor: colors.white
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
                  borderBottomWidth: 1,
                  borderBottomColor: 'var(--primary-500)',
                  paddingBottom: '1px'
                }
              },
              'a code': {
                color: 'inherit',
                fontWeight: theme('fontWeight.medium')
              },
              strong: {
                color: colors.warmGray[900],
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
                backgroundColor: colors.warmGray[100],
                borderRadius: theme('borderRadius.md')
              },
              'code::before': {
                content: ''
              },
              'code::after': {
                content: ''
              },
              pre: {
                backgroundColor: colors.warmGray[100],
                color: colors.warmGray[800],
                borderRadius: theme('borderRadius.md'),
                paddingTop: theme('padding.3'),
                paddingRight: theme('padding.4'),
                paddingBottom: theme('padding.3'),
                paddingLeft: theme('padding.4'),
                marginTop: 0,
                marginBottom: 0
              },
              'pre code': {
                backgroundColor: 'transparent',
                fontFamily: defaultTheme.fontFamily.mono.join()
              },
              table: {
                fontSize: theme('fontSize.sm')[0],
                lineHeight: theme('fontSize.sm')[1].lineHeight
              },
              thead: {
                color: colors.warmGray[600],
                borderBottomColor: colors.warmGray[200]
              },
              'thead th': {
                paddingTop: 0,
                fontWeight: theme('fontWeight.semibold')
              },
              'tbody tr': {
                borderBottomColor: colors.warmGray[200]
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
              color: colors.warmGray[50],
              strong: {
                color: colors.warmGray[100]
              },
              a: {
                color: 'var(--primary-400)'
              },
              'ol > li::before': {
                color: colors.warmGray[400]
              },
              'ul > li::before': {
                backgroundColor: colors.warmGray[600]
              },
              hr: {
                borderColor: colors.warmGray[700]
              },
              blockquote: {
                color: colors.warmGray[400],
                borderLeftColor: colors.warmGray[700]
              },
              h1: {
                color: colors.warmGray[100]
              },
              h2: {
                color: colors.warmGray[100]
              },
              h3: {
                color: colors.warmGray[100]
              },
              h4: {
                color: colors.warmGray[100]
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
                  borderBottomColor: colors.warmGray[100],
                  code: {
                    borderColor: colors.warmGray[500]
                  }
                },
                'code:before': {
                  backgroundColor: colors.warmGray[900]
                }
              },
              'figure figcaption': {
                color: colors.warmGray[400]
              },
              code: {
                fontWeight: '400',
                color: 'inherit',
                backgroundColor: colors.warmGray[800],
                borderRadius: theme('borderRadius.md')
              },
              'code::before': {
                content: ''
              },
              'code::after': {
                content: ''
              },
              pre: {
                backgroundColor: colors.warmGray[800],
                color: colors.white
              },
              'pre code': {
                backgroundColor: 'transparent',
                color: colors.warmGray[100]
              },
              'a code': {
                color: 'inherit',
                fontWeight: theme('fontWeight.medium')
              },
              thead: {
                color: colors.warmGray[100],
                borderBottomColor: colors.warmGray[600]
              },
              'tbody tr': {
                borderBottomColor: colors.warmGray[700]
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
    }
  }
}
