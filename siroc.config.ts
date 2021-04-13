import fs from 'fs'
import { glob as _glob } from 'glob'
import pify from 'pify'
import { defineSirocConfig } from 'siroc'
import { minify, MinifyOptions } from 'terser'
import { copyFileSync, mkdirSync, existsSync } from 'graceful-fs'

const glob = pify(_glob)

let messageSent = false

let typesCopied = false

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
          const { code } = minify(contents, options)
          await fs.promises.writeFile(file, code || contents)
        })
      )

      // Copy types to /dist/types
      if (!typesCopied) {
        if (!existsSync('./dist/types')) mkdirSync('./dist/types')

        const types = await glob('./src/types/*.ts')
        const typesCount = types.length

        await Promise.all(
          types.map((file: string) => {
            const fileName = file.split('/')[3]
            return copyFileSync(file, `./dist/types/${fileName}`)
          })
        )

        // eslint-disable-next-line no-console
        console.log(`🏷Copying ${typesCount} type declarations`)

        typesCopied = true
      }
    }
  }
})
