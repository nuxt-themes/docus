import { join } from 'path'
import chalk from 'chalk'
import { NuxtOptionsServer } from '@nuxt/types/config/server'
import serveStatic from 'serve-static'
import { Module } from '@nuxt/types'
import { createServer as createViteServer } from 'vite'
import api from '../api'
import windicss from './windicss'

export default <Module>function () {
  const { nuxt, addServerMiddleware, options } = this

  process.options = nuxt.options
  process.previewUrl = 'http://localhost:4000'

  // Add runtime plugin
  if (options.dev) this.options.plugins.push(require.resolve(join(__dirname, '../runtime/plugin')))

  nuxt.hook('listen', (_: any, { host, port }: NuxtOptionsServer) => {
    process.previewUrl = `http://${host}:${port}`

    nuxt.options.cli.badgeMessages.push(
      '',
      chalk.bold('📝 Admin: ') + chalk.underline.yellow(`${process.previewUrl}/admin/`)
    )
  })

  const windiMiddleware = windicss(nuxt)

  if (process.env.ADMIN_DEV) {
    // use Vite as middleware
    const server = createViteServer({
      root: join(__dirname, '../app'),
      server: {
        middlewareMode: 'html'
      },
      plugins: [
        {
          name: 'docus:admin-api',
          configureServer(server) {
            server.middlewares.use('/api', api)
            server.middlewares.use('/__windicss', windiMiddleware)
          }
        }
      ]
    })

    nuxt.hook('render:setupMiddleware', async () => {
      nuxt.server.app.use('/admin/', (await server).middlewares)
    })
  } else {
    // use built dist
    addServerMiddleware({
      path: '/admin/',
      handle: serveStatic(join(__dirname, '../app/dist'))
    })
    addServerMiddleware({
      path: '/admin/api',
      handler: api
    })
    addServerMiddleware({
      path: '/admin/__windicss',
      handler: windiMiddleware
    })
  }
}
