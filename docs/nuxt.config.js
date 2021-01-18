import { withDocus } from 'docus'

export default withDocus({
  content: {
    liveEdit: false
  },
  buildModules: [
    'vue-plausible'
  ],
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev',
    apiHost: 'https://plausible.io'
  }
})
