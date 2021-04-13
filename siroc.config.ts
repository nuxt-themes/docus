import fs from 'fs'

import { glob as _glob } from 'glob'
import pify from 'pify'
import { defineSirocConfig } from 'siroc'
import { minify, MinifyOptions } from 'terser'

const glob = pify(_glob)

const MINIFY_VUE = true

export default defineSirocConfig({
  sortDependencies: true,
  rollup: {
    externals: ['./src/app/nuxt.config.js']
  },
  hooks: {
    async 'build:done'() {
      const jsFiles = await glob('./dist/**/*.js')
      const vueFiles = MINIFY_VUE ? await glob('./dist/**/*.vue') : []
      const nameCache = {}
      const options: MinifyOptions = {
        nameCache,
        ecma: 2020
      }
      await Promise.all([
        ...jsFiles.map(async (file: string) => {
          const contents = await fs.promises.readFile(file, 'utf-8')
          const { code } = await minify(contents, options)
          await fs.promises.writeFile(file, code || contents)
        }),
        ...vueFiles.map(async (file: string) => {
          const contents = await fs.promises.readFile(file, 'utf-8')

          // eslint-disable-next-line
          const [scriptBlock, _, script] = contents.match(/<script(\s[^>\s]*)*>([\S\s.]*?)<\/script>/) || []
          if (!scriptBlock || !script) return

          const { code } = await minify(script, {
            compress: {
              // Prevents a strange issue with `vite` where `data:()=>({test:0})`
              // gets transformed to `data:=>({test:0})`
              arrows: false
            },
            ...options
          })

          await fs.promises.writeFile(file, contents.replace(scriptBlock, `<script>\n${code}</script>`))
        })
      ])
    }
  }
})
