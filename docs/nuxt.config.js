import { resolve } from 'path'
import { withDocus } from 'docus'
import windiConfig from './windi.config'

export default withDocus({
  content: {
    liveEdit: false
  },
  buildModules: [
    'vue-plausible'
  ],
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev'
  },
  windicss: {
    root: resolve(__dirname, '..'),
    // Workaround waiting for https://github.com/windicss/nuxt-windicss-module/issues/30
    config: windiConfig
  }
})
