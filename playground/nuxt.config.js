import { resolve } from 'path'
import { withDocus } from '../src'

export default withDocus({
  rootDir: __dirname,
  windicss: {
    root: resolve(__dirname, '..')
  }
})
