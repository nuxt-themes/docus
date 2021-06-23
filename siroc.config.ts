import { execSync } from 'child_process'
import { defineSirocConfig } from 'siroc'

export default defineSirocConfig({
  sortDependencies: true,
  rollup: {
    externals: ['./src/app/nuxt.config.js']
  },
  hooks: {
    'build:extend'() {
      // eslint-disable-next-line no-console
      console.log('📝 Building the admin app')
      execSync('npx vite --config src/admin/app/vite.config.ts build', { stdio: 'inherit' })
    }
  }
})
