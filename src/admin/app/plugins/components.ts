import { join } from 'path'
import { existsSync } from 'fs'
import fg from 'fast-glob'
import { Plugin, ViteDevServer } from 'vite'

export function VitePluginVuePreview(root: string): Plugin {
  let server: ViteDevServer | undefined

  return {
    name: 'vite-plugin-vue-preview',
    apply: 'serve',
    enforce: 'pre',
    resolveId(id) {
      return id.startsWith('/__components_script/')
    },
    load(id) {
      if (!id.startsWith('/__components_script/')) return

      const url = join(root, 'components', id.slice('/__components_script/'.length))

      return `
<template>
  <Component>
    Preview
  </Component>
</template>

<script setup>
import Component from '/@fs${url}'
</script>

<script>
import 'virtual:windi.css'
import { createApp } from 'vue'
setTimeout(()=>{
  createApp(_sfc_main).mount('#app')
}, 0)
</script>
`
    },
    configureServer(_server) {
      server = _server

      server.middlewares.use('/__components/', async (req, res, next) => {
        if (!req.url) return

        if (req.url === '/') {
          const files = await fg('**/*.vue', {
            cwd: join(root, 'components'),
            ignore: ['.git', 'node_modules'],
            onlyFiles: true
          })

          res.statusCode = 200
          res.end(`
<body>
  <ul>
  ${files.map(f => `<li><a href="/admin/__components/${f}">${f}</a></li>`).join('\n')}
  </ul>
</body>
`)
        } else {
          const path = join(root, 'components', req.url.slice(1))
          if (!existsSync(path)) return next()

          res.statusCode = 200
          res.end(`
      <body>
        <div id="app"></div>
        <script type="module" src="/admin/__components_script${req.url}"></script>
      </body>
      `)
        }
      })
    }
  } as Plugin
}

export default VitePluginVuePreview
