import { defineSirocConfig } from 'siroc'

export default defineSirocConfig({
  rollup: {
    externals: [
      'docus/theme/nuxt.config.js'
    ]
  }
})
