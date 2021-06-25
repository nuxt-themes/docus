/*
 ** Windi CSS Configuration File
 **
 ** Docs: https://next.windicss.org/guide/configuration.html
 */
import colors from 'windicss/colors'
import defaultTheme from 'windicss/defaultTheme'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import filters from 'windicss/plugin/filters'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  plugins: [filters, aspectRatio],
  // Include Docus node_module when used this way
  extract: {
    include: ['node_modules/docus/dist/**/*.{html,vue,md,mdx,pug,jsx,tsx,svelte,css,ts,js}']
  },
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
      fontSize: {
        inherit: 'inherit',
        root: '16px', // Safari fix to disable font size scaling
        lg: ['1.125rem', '1.5rem'] // NOT WORKING
      },
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
        base: '320px',
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
        base: '320px',
        '8xl': '90rem',
        '1/2': '50%'
      },
      minWidth: {
        '1/2': '50%'
      },
      inset: {
        18: '4.5rem'
      }
    }
  }
})
