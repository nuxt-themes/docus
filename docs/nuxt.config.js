import { resolve } from 'path'
import { withDocus } from 'docus'

export default withDocus({
  // This is important because windicss resolve files baded on root dir
  rootDir: resolve(__dirname, '../'),
  srcDir: __dirname,
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
