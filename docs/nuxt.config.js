import { withDocus } from 'docus'

export default withDocus({
  alias: {
    qrcode: require.resolve('./mock/default'),
    axios: require.resolve('./mock/default'),
    nprogress: require.resolve('./mock/default'),
    jwt_decode: require.resolve('./mock/default')
  },
  content: {
    liveEdit: false
  },
  buildModules: [
    'vue-plausible/lib/esm'
  ],
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev'
  },
  vite: {
    optimizeDeps: {
      exclude: ['@vueuse/integrations', 'vue-demi']
    }
  }
})
