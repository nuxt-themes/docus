import { defineSirocConfig } from 'siroc'

export default defineSirocConfig({
  sortDependencies: true,
  rollup: {
    externals: ['./src/app/nuxt.config.js']
  }
})
