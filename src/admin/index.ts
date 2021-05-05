import { join } from 'path'
import chalk from 'chalk'
import serveStatic from 'serve-static'
import { NuxtOptionsServer } from '@nuxt/types/config/server'
import { Module } from '@nuxt/types'
import api from './api'

export default <Module>function () {
  const { nuxt } = this

  process.options = nuxt.options
  process.previewUrl = 'http://localhost:3000'

  this.addServerMiddleware({
    path: '/admin/api',
    handler: api
  })

  this.addServerMiddleware({
    path: '/admin/',
    handler: serveStatic(join(__dirname, 'app/dist'))
  })

  nuxt.hook('listen', (_: any, { host, port }: NuxtOptionsServer) => {
    process.previewUrl = `http://${host}:${port}`

    nuxt.options.cli.badgeMessages.push(
      chalk.bold('Docus Admin: ') + chalk.underline.yellow(`${process.previewUrl}/admin/`)
    )
  })
}
