export default function ({ app, $docus }) {
  app.i18n.onLanguageSwitched = () => $docus.fetchCategories()
}
