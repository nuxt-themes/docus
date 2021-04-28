/*
 ** Windi CSS Configuration File
 **
 ** Docs: https://next.windicss.org/guide/configuration.html
 */
import colors from 'windicss/colors'
import defaultTheme from 'windicss/defaultTheme'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import filters from 'windicss/plugin/filters'

export default {
  darkMode: 'class',
  plugins: [filters, aspectRatio],
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
    backdropFilter: {
      blur: {
        sm: 'blur(8px)',
        DEFAULT: 'blur(12px)'
      }
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
      minHeight: () => ({
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
    }
  },
  shortcuts: {
    // Primary
    'text-primary': 'text-primary-500 dark:text-primary-400',
    'border-primary': 'border-primary-500 dark:border-primary-400',
    'bg-primary': 'bg-primary-500 dark:bg-primary-400',
    // Icons
    'text-icon': 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400',
    'd-icon': 'text-icon focus:outline-none',
    // Images utils
    'light-img': 'dark:hidden',
    'dark-img': 'light:hidden',
    // Container
    'max-w-container': 'max-w-8xl',
    'px-container': 'px-4 sm:px-6',
    'd-container': 'max-w-container mx-auto',
    'd-container-content': 'd-container px-container',
    // Header
    'blur-header': 'blur-12',
    'bg-header': 'bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80',
    'border-header': 'border-b border-gray-100 dark:border-gray-800',
    'd-header': 'sticky w-full top-0 z-50 bg-header border-header blur-header h-header'
  }
}
