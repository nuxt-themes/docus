import { withDocus } from 'docus'

export default withDocus({
  content: {
    liveEdit: false
  },
  buildModules: [
    'vue-plausible/lib/esm'
  ],
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev'
  }
})
