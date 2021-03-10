<template>
  <div
    class="shadow-md rounded-md overflow-hidden bg-gray-800 mx-2 mb-4"
    :style="{width: '400px',height: '370px'}"
  >
    <div class="px-3 h-8 flex justify-between items-center">
      <div class="flex w-16">
        <div class="circle mx-1 w-3 h-3 rounded-full bg-gray-700"></div>
        <div class="circle mx-1 w-3 h-3 rounded-full bg-gray-700"></div>
        <div class="circle mx-1 w-3 h-3 rounded-full bg-gray-700"></div>
      </div>
      <div>
        Preview
      </div>
      <div class="w-16">
        <a class="block w-4 ml-auto" title="Open in CodeSandbox" :href="codeSandBoxLink" target="_blank" rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M234.4 452V267.5L75.6 176.1v105.2l72.7 42.2v79.1l86.1 49.4zm41.2 1.1l87.6-50.5v-81l73.2-42.4V175.3l-160.8 92.8v185zm139.6-313.2l-84.5-49-74.2 43.1-74.8-43.1-85.3 49.6 159.1 91.6 159.7-92.2zM34.4 384.7V129L256 0l221.6 128.4v255.9L256 512 34.4 384.7z"></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="flex p-1 h-full">
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

export default {
  data () {
    return {
      files: {},
      codeSandBoxLink: '#'
    }
  },
  computed: {
    config () {
      return {
        files: {
          ...this.files,
          '/src/main.js': { code: 'import Vue from "vue"; import App from "./App.vue"; Vue.config.productionTip = false; new Vue({ render: h => h(App) }).$mount("#app");' },
          '/public/index.html': { code: '<div id="app"></div>' }
        },
        dependencies: { vue: '^2.6.11', '@vue/cli-plugin-babel': '4.1.1' },
        entry: '/src/main.js',
        main: '/src/App.vue',
        environment: 'vue-cli'
      }
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
      const activePath = '/src/App.vue'
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
.sticky {
  top: 100px;
}
</style>
