import withDocus from 'docus'

export default withDocus({
  docs: {
    primaryColor: '#3B82F6'
  },
  content: {
    liveEdit: false
  },
  buildModules: [
    'nuxt-ackee'
  ],
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    // TODO: update domainId
    domainId: '7b3c9779-442c-40c6-9931-ea71977c52a8',
    detailed: true
  }
})

// import theme from '@nuxt/docs-theme'

// export default theme({
//   rootDir: __dirname,
//   docs: {
//     primaryColor: '#00CD81'
//   },
//   i18n: {
//     locales: () => [{
//       code: 'ru',
//       iso: 'ru-RU',
//       file: 'ru-RU.js',
//       name: 'Русский'
//     }, {
//       code: 'fr',
//       iso: 'fr-FR',
//       file: 'fr-FR.js',
//       name: 'Français'
//     }, {
//       code: 'ja',
//       iso: 'ja_JP',
//       file: 'ja_JP.js',
//       name: '日本語'
//     }, {
//       code: 'en',
//       iso: 'en-US',
//       file: 'en-US.js',
//       name: 'English'
//     }],
//     defaultLocale: 'en'
//   },
//   buildModules: [
//     'nuxt-ackee'
//   ],
//   ackee: {
//     server: 'https://ackee.nuxtjs.com',
//     domainId: '7b3c9779-442c-40c6-9931-ea71977c52a8',
//     detailed: true
//   },
//   pwa: {
//     manifest: {
//       name: 'Nuxt Content'
//     }
//   }
// })
