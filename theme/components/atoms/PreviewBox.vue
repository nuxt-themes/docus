<template>
  <div class="preview-box shadow-md rounded-md overflow-hidden bg-gray-800 mb-4">
    <div class="px-3 h-8 flex justify-between items-center">
      <div class="flex w-16">
        <div class="circle mx-1 w-3 h-3 rounded-full bg-gray-700"></div>
        <div class="circle mx-1 w-3 h-3 rounded-full bg-gray-700"></div>
        <div class="circle mx-1 w-3 h-3 rounded-full bg-gray-700"></div>
      </div>
      <div class="text-sm">
        {{ title }}
      </div>
      <div class="w-16">
        <a class="block w-4 ml-auto" title="Open in CodeSandbox" :href="codeSandBoxLink" target="_blank" rel="noopener noreferrer">
          <IconCodeSandBox class="h-4 w-4" />
        </a>
      </div>
    </div>
    <div class="flex h-full">
      <iframe ref="preview" class="bg-white w-full h-full" />
    </div>
    <div ref="container" class="hidden">
      <slot />
    </div>
  </div>
</template>

<script>
import { SandpackClient } from 'smooshpack'
import { getParameters } from 'codesandbox-import-utils/lib/api/define'

const templates = {
  vue: files => ({
    files: {
      ...files,
      '/index.js': { code: 'import Vue from "vue"; import App from "./src/App.vue"; Vue.config.productionTip = false; new Vue({ render: h => h(App) }).$mount("#app");' },
      '/public/index.html': { code: '<div id="app"></div>' }
    },
    dependencies: { vue: '^2.6.11', '@vue/cli-plugin-babel': '4.1.1' },
    entry: '/index.js',
    main: '/src/App.vue',
    environment: 'vue-cli'
  }),
  react: files => ({
    files: {
      ...files,
      '/index.js': { code: 'import React, { StrictMode } from "react"; import ReactDOM from "react-dom"; import App from "./src/App"; const rootElement = document.getElementById("root"); ReactDOM.render(<StrictMode><App /></StrictMode>,rootElement);' },
      '/public/index.html': { code: '<div id="root"></div>' }
    },
    dependencies: { react: '^17.0.0', 'react-dom': '^17.0.0', 'react-scripts': '^4.0.0' },
    entry: '/index.js',
    main: '/App.js',
    environment: 'create-react-app'
  })
}

export default {
  props: {
    title: {
      type: String,
      default: 'Preview'
    }
  },
  data () {
    return {
      files: {},
      codeSandBoxLink: '#'
    }
  },
  computed: {
    config () {
      const filenames = Object.keys(this.files)
      const isVue = filenames.find(name => name.match(/\.vue$/))
      const template = isVue ? templates.vue : templates.react
      return template(this.files)
    },
    clientOptions () {
      return {
        showOpenInCodeSandbox: false,
        showLoadingScreen: false
      }
    }
  },
  mounted () {
    this.fetchFiles()
    this._preview = new SandpackClient(this.$refs.preview, this.config, this.clientOptions)
    this.codeSandBoxLink = this.generateCodeSandboxURL()
  },
  methods: {
    generateCodeSandboxURL () {
      const files = this._preview.getFiles()
      const normalized = Object.keys(files).reduce(
        (prev, next) => ({
          ...prev,
          [next.replace('/', '')]: {
            content: files[next].code,
            isBinary: false
          }
        }),
        {}
      )
      const params = getParameters({ files: normalized })
      const activePath = Object.keys(this.files).shift()
      return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${params}&query=file=${activePath}%26from-sandpack=true`
    },
    update () {
      this.fetchFiles()
      if (this._preview) {
        this._preview.updatePreview(this.config)
      } else {
        this._preview = new SandpackClient(this.$refs.preview, this.config, this.clientOptions)
      }
      this.codeSandBoxLink = this.generateCodeSandboxURL()
    },
    fetchFiles () {
      let codes = [...this.$el.querySelectorAll('.nuxt-content-highlight')]
      if (!codes.length) {
        codes = [...this.$parent.$el.querySelectorAll('.nuxt-content-highlight')]
      }
      const files = codes.reduce((obj, el) => {
        let filePath = el.querySelector('.filename')?.textContent || ''
        if (filePath) {
          if (!filePath.startsWith('/')) {
            filePath = `/src/${filePath}`
          }
          const fileName = filePath.split('/').pop()
          const code = el.querySelector('pre').textContent
          obj[filePath] = {
            code,
            fileName,
            filePath
          }
        } else {
          console.warn('Cannot use code without file name')
        }
        return obj
      }, {})
      this.files = files
    }
  }
}
</script>

<style scoped>
.preview-box {
  width: 400px;
  height: 370px;
  @apply max-w-full;
}
</style>