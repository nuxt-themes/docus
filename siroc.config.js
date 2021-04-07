import { defineSirocConfig } from 'siroc'

export default defineSirocConfig({
  rollup: {
    externals: [
      './theme/nuxt.config.js'
    ]
  }
})
