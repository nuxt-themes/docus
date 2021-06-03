export default ({ app, $config: { nuxtLocale } }) => {
  app.i18n.setLocale(nuxtLocale)
}
