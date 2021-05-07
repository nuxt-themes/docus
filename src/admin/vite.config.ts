import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { dependencies, devDependencies } from '../../package.json'

const r = path => resolve(__dirname, path)
const root = join(__dirname, 'app')

export default defineConfig({
  root,
  base: '/admin/',
  server: {
    port: 4001
  },
  plugins: [
    vue(),
    WindiCSS({
      root,
      scan: {
        include: [r('app/**/*')]
      }
    })
  ],
  resolve: {
    alias: {
      vue: 'vue3'
    }
  },
  optimizeDeps: {
    exclude: Object.keys({ ...dependencies, ...devDependencies }).concat(['fs', 'path'])
  }
})
