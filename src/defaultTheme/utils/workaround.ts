import defu from 'defu'

export default (windiOptions: any, nuxt: any) => {
  if (typeof windiOptions.config.theme.extend.typography === 'function') {
    const defaultTheme = nuxt.resolver.requireModule('windicss/defaultTheme')

    const theme = (key: string) => {
      const keys = key.split('.')
      return keys.reduce((res, _key) => res[_key], defu(windiOptions.config.theme, defaultTheme))
    }

    windiOptions.config.theme.extend.typography = windiOptions.config.theme.extend.typography(theme)
  }
}
