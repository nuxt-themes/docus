import { resolve } from 'path'
import { withDocus } from '../src'

export default withDocus({
  windicss: {
    root: resolve(__dirname, '..')
  }
})
