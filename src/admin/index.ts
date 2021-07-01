import { resolve } from 'path'
import { Module } from '@nuxt/types'

export default <Module>function () {
  this.addModule(resolve(__dirname, 'modules/admin.ts'))
  this.addModule(resolve(__dirname, 'modules/components.ts'))
}
