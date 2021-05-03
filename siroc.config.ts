import fs from 'fs'
import { glob as _glob } from 'glob'
import pify from 'pify'
import { defineSirocConfig } from 'siroc'
import { minify, MinifyOptions } from 'terser'

const glob = pify(_glob)

let messageSent = false

export default defineSirocConfig({
  sortDependencies: true,
  rollup: {
    externals: ['./src/app/nuxt.config.js']
  },
  hooks: {
    // Minify build
    async 'build:done'() {
      // Wait for mkdist to transpile everything
      await new Promise(resolve => setTimeout(resolve, 2000))

      const jsFiles = [...(await glob('./dist/**/*.js')), ...(await glob('./dist/**/*.mjs'))]
      const nameCache = {}
      const options: MinifyOptions = {
        nameCache,
        ecma: 2020
      }

      if (!messageSent) {
        const filesCount = jsFiles.length

        // eslint-disable-next-line no-console
        console.log(`🔐Minifying ${filesCount} built files`)

        messageSent = true
      }

      await Promise.all(
        jsFiles
          // Skip plugin template file
          .filter((file: string) => !['./dist/core/plugin.js', './dist/social-image/runtime/plugin.js'].includes(file))
          .map(async (file: string) => {
            try {
              const contents = await fs.promises.readFile(file, 'utf-8')

              const { code } = await minify(contents, options)

              await fs.promises.writeFile(file, code || contents)
            } catch (e) {
              console.log('Could not minify:')
              console.log(file)
            }
          })
      )
    }
  }
})
