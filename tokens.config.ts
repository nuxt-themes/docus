import { defineTheme } from 'pinceau'
import nuxtThemeTokens from '@nuxt-themes/tokens/tokens'

export default defineTheme({
  colors: {
    primary: (nuxtThemeTokens.colors as any).lightblue
  },
  docus: {
    page: {
      height: 'calc(100vh - calc(calc({docus.header.height} + {docus.footer.height})))',
      maxWidth: '90rem'
    },
    header: { height: '64px' },
    footer: { height: '50px' },
  },
  typography: {
    colors: {
      primary: {
        50: '{colors.primary.50}',
        100: '{colors.primary.100}',
        200: '{colors.primary.200}',
        300: '{colors.primary.300}',
        400: '{colors.primary.400}',
        500: '{colors.primary.500}',
        600: '{colors.primary.600}',
        700: '{colors.primary.700}',
        800: '{colors.primary.800}',
        900: '{colors.primary.900}'
      },
      secondary: {
        50: '{colors.gray.50}',
        100: '{colors.gray.100}',
        200: '{colors.gray.200}',
        300: '{colors.gray.300}',
        400: '{colors.gray.400}',
        500: '{colors.gray.500}',
        600: '{colors.gray.600}',
        700: '{colors.gray.700}',
        800: '{colors.gray.800}',
        900: '{colors.gray.900}'
      }
    }
  },
  backdrop: {
    filter: 'saturate(200%) blur(20px)',
    background: {
      // TODO: rgba 80% from colors.white
      initial: '#fffc',
      // TODO: rgba 80% from colors.black
      dark: '#0c0d0ccc'
    }
  }
})
