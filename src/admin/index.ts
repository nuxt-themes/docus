import { join } from 'path'
import { execSync } from 'child_process'
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

  // Build the admin
  execSync('npx vite --config src/admin/vite.config.ts build')

  this.addServerMiddleware({
    path: '/admin/',
    handler: serveStatic(join(__dirname, 'app/dist'))
  })

  nuxt.hook('listen', (_: any, { host, port }: NuxtOptionsServer) => {
    process.previewUrl = `http://${host}:${port}`

    nuxt.options.cli.badgeMessages.push(
      '',
      chalk.bold('📝 Admin: ') + chalk.underline.yellow(`${process.previewUrl}/admin/`)
    )
  })
}
