import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
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
    }),
    ViteComponents({
      dirs: [],
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: ''
        })
      ]
    }),
    ViteIcons()
  ],
  resolve: {
    alias: {
      vue: 'vue3'
    }
  },
  optimizeDeps: {
    exclude: Object.keys({ ...dependencies, ...devDependencies }).concat(['fs', 'path'])
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: ['monaco-editor/esm/vs/language/json/json.worker'],
          cssWorker: ['monaco-editor/esm/vs/language/css/css.worker'],
          htmlWorker: ['monaco-editor/esm/vs/language/html/html.worker'],
          tsWorker: ['monaco-editor/esm/vs/language/typescript/ts.worker'],
          editorWorker: ['monaco-editor/esm/vs/editor/editor.worker']
        }
      }
    }
  }
})
