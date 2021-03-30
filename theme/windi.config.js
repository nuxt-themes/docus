/*
 ** Windi CSS Configuration File
 **
 ** Docs: https://next.windicss.org/guide/configuration.html
 */
import colors from 'windicss/colors'
import defaultTheme from 'windicss/defaultTheme'
import typography from 'windicss/plugin/typography'
import aspectRatio from 'windicss/plugin/aspect-ratio'

export default {
  darkMode: 'class',
  plugins: [
    typography(),
    aspectRatio
  ],
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
      gray: colors.gray
    },
    extend: {
      fontFamily: {
        sans: 'Inter, ' + defaultTheme.fontFamily.sans
      },
      letterSpacing: {
        semitight: '-0.0125em'
      },
      screens: {
        xs: '414px'
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
        header: 'var(--header-height)',
        18: '4.5rem',
        46: '11.5rem',
        '580px': '580px',
        '640px': '640px'
      },
      height: theme => ({
        '(full-18)': `calc(100% - ${theme('spacing.18')})`,
        '(full-header)': `calc(100% - ${theme('spacing.header')})`,
        '(screen-18)': `calc(100vh - ${theme('spacing.18')})`,
        '(screen-header)': `calc(100vh - ${theme('spacing.header')})`,
        '(screen-36)': `calc(100vh - ${theme('spacing.36')})`,
        '(screen-46)': `calc(100vh - ${theme('spacing.46')})`
      }),
      maxHeight: theme => ({
        '(screen-18)': `calc(100vh - ${theme('spacing.18')})`,
        '(screen-header)': `calc(100vh - ${theme('spacing.header')})`
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
            letterSpacing: '-0.0125em',
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
              fontWeight: theme('fontWeight.bold')
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
              letterSpacing: theme('letterSpacing.tight')
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
            'h2 code': {
              color: 'inherit',
              fontWeight: 'inherit',
              pointerEvents: 'none'
            },
            'h3 code': {
              color: 'inherit',
              fontWeight: 'inherit',
              pointerEvents: 'none'
            },
            'h2 > a, h3 > a': {
              color: 'inherit',
              fontWeight: 'inherit',
              position: 'relative',
              code: {
                border: '1px dashed transparent',
                position: 'relative',
                zIndex: '0'
              },
              '&:hover': {
                borderBottomWidth: '0px',
                paddingBottom: '0px',
                code: {
                  borderColor: theme('colors.gray.500')
                }
              },
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '100%',
                height: 'calc(100% + 4px)'
              },
              '&:hover:before': {
                borderBottomWidth: '1px',
                borderStyle: 'dashed',
                borderBottomColor: theme('colors.gray.900')
              },
              'code:before': {
                content: '""',
                position: 'absolute',
                top: '-4px',
                left: '-4px',
                zIndex: '-1',
                width: 'calc(100% + 8px)',
                height: 'calc(100% + 8px)',
                backgroundColor: theme('colors.white'),
                pointerEvents: 'none'
              }
            },
            'ol, ul': {
              marginLeft: '0px',
              marginRight: '0px',
              padding: '0px'
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
                borderBottomWidth: '2px',
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
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.800'),
              borderRadius: theme('borderRadius.md'),
              paddingTop: theme('padding.3'),
              paddingRight: theme('padding.4'),
              paddingBottom: theme('padding.3'),
              paddingLeft: theme('padding.4'),
              marginTop: '0px',
              marginBottom: '0px'
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
              color: theme('colors.gray.600'),
              borderBottomColor: theme('colors.gray.200')
            },
            'thead th': {
              paddingTop: '0px',
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
              color: 'var(--primary-400)',
              '&:hover': {
                borderBottomColor: 'var(--primary-400)'
              }
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
            'h2 > a': {
              color: 'inherit',
              fontWeight: 'inherit',
              '&:hover': {
                code: {
                  borderColor: theme('colors.gray.500')
                },
                '&:before': {
                  borderBottomColor: theme('colors.gray.100')
                }
              },
              'code:before': {
                backgroundColor: theme('colors.gray.900')
              }
            },
            'h3 > a': {
              color: 'inherit',
              fontWeight: 'inherit',
              '&:hover': {
                code: {
                  borderColor: theme('colors.gray.500')
                },
                '&:before': {
                  borderBottomColor: theme('colors.gray.100')
                }
              },
              'code:before': {
                backgroundColor: theme('colors.gray.900')
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
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.white')
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
  shortcuts: {
    'light-img': 'block dark:hidden',
    'dark-img': 'hidden dark:block'
  }
}
