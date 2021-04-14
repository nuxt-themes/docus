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

      const jsFiles = await glob('./dist/**/*.js')
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
        jsFiles.map(async (file: string) => {
          const contents = await fs.promises.readFile(file, 'utf-8')
          // @ts-ignore
          const { code } = minify(contents, options)
          await fs.promises.writeFile(file, code || contents)
        })
      )
    }
  }
})
