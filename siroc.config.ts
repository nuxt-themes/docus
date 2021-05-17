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

      const skipMinify = ['./dist/core/plugin', './dist/social-image/runtime/plugin', './dist/i18n/runtime/plugin']

      await Promise.all(
        jsFiles
          // Skip plugin template file
          .filter(
            (file: string) =>
              !skipMinify.reduce<boolean>((prev, val) => {
                if (prev === true) return prev

                if (file.includes(val)) prev = true

                return prev
              }, false)
          )
          .map(async (file: string) => {
            try {
              const contents = await fs.promises.readFile(file, 'utf-8')

              const { code } = await minify(contents, options)

              await fs.promises.writeFile(file, code || contents)
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log('Could not minify:')

              // eslint-disable-next-line no-console
              console.log(file)
            }
          })
      )
    }
  }
})
