import { defineSirocConfig } from 'siroc'

export default defineSirocConfig({
  rollup: {
    externals: ['./src/app/nuxt.config.js']
  }
})
