import { defineTheme } from 'pinceau'

export default defineTheme({
  colors: {
    white: { value: '#fff' },
    black: { value: '#0c0c0d' },
    gray: {
      50: { value: '#fafafa' },
      100: { value: '#f4f4f5' },
      200: { value: '#e4e4e7' },
      300: { value: '#d4d4d8' },
      400: { value: '#a1a1aa' },
      500: { value: '#71717a' },
      600: { value: '#52525b' },
      700: { value: '#3f3f46' },
      800: { value: '#27272a' },
      900: { value: '#18181b' }
    },
    primary: {
      50: { value: '#d9f1ff' },
      100: { value: '#b3e4ff' },
      200: { value: '#8dd6ff' },
      300: { value: '#66c8ff' },
      400: { value: '#40bbff' },
      500: { value: '#1aadff' },
      600: { value: '#0090e1' },
      700: { value: '#006ca9' },
      800: { value: '#004870' },
      900: { value: '#002438' }
    }
  },
  fonts: {
    primary: {
      value: 'Inter, sans-serif'
    },
    code: {
      value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
    }
  },
  page: {
    height: {
      value: 'calc(100vh - calc(calc({header.height} + {footer.height})))'
    },
    maxWidth: {
      value: '90rem'
    }
  },
  header: {
    height: { value: '64px' }
  },
  footer: {
    height: { value: '50px' }
  },
  screens: {
    lg: {
      value: '1024px'
    }
  }
})
