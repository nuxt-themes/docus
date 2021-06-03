// export default {
//   computed: {
//     locales () {
//       return [
//         { text: 'English', locale: 'en', path: 'https://nuxtjs.org' + this.$route.path },
//         { text: 'Français', locale: 'fr', path: 'https://fr.nuxtjs.org' + this.$route.path },
//         { text: '简体中文', locale: 'zh', path: 'https://zh.nuxtjs.org' + this.$route.path },
//         { text: '日本語', locale: 'ja', path: 'https://ja.nuxtjs.org' + this.$route.path },
//         { text: '한국어', locale: 'ko', path: 'https://ko.nuxtjs.org' + this.$route.path },
//         { text: 'Русский', locale: 'ru', path: 'https://ru.nuxtjs.org' + this.$route.path },
//         { text: 'Indonesian', locale: 'id', path: 'https://id.nuxtjs.org' + this.$route.path }
//       ]
//     },
//     currentLang: {
//       get () {
//         return this.locales.map(l => l.locale).indexOf(this.$store.state.locale)
//       },
//       set (index) {
//         const lang = this.locales[index]
//         if (!lang) {
//           return
//         }
//         window.location.href = lang.path
//       }
//     }
//   }
// }
