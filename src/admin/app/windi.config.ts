import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import settings from '../../defaultTheme/settings'

export default defineConfig({
  theme: {
    extend: {
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
      }
    }
  },
  shortcuts: {
    ...settings.shortcuts
  }
})
