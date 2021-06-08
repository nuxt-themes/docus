import defaultTheme from 'windicss/defaultTheme'
import colors from 'windicss/colors'

export default {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary-green': '#00DC82',
      secondary: '#002E3B',
      'secondary-light': '#064A5B',
      'secondary-dark': '#01232D',
      'secondary-darker': '#001D25',
      'secondary-darkest': '#00181F',
      terciary: '#B2CCCC',
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
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    }
  },
  shortcuts: {
    'text-display-6': {
      fontSize: '1.875rem',
      lineHeight: '2.25rem'
    },
    'text-display-5': {
      fontSize: '2.25rem',
      lineHeight: '2.5rem'
    },
    'text-display-4': {
      fontSize: '3rem',
      lineHeight: '3rem'
    },
    'text-display-3': {
      fontSize: '3.75rem',
      lineHeight: '3.75rem'
    },
    'text-display-2': {
      fontSize: '4.5rem',
      lineHeight: '4.5rem'
    },
    'text-display-1': {
      fontSize: '6rem',
      lineHeight: '6rem'
    }
  }
}
