import { defineThemeTokens } from '@nuxt-themes/kit'

export default defineThemeTokens({
  fonts: {
    primary: {
      value: 'Inter, sans-serif',
    },
    code: {
      value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    },
  },
  page: {
    height: {
      value: 'calc(100vh - calc({header.height} + {footer.height} + 50px))',
    },
    maxWidth: {
      value: '90rem',
    },
  },
  header: {
    height: {
      value: '4rem',
    },
  },
  footer: {
    height: {
      value: '4rem',
    },
  },
})
