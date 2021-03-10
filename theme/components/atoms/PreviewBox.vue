<template>
  <div
    class="shadow-md rounded-md overflow-hidden flex p-1 pt-8 bg-gray-800 mx-2 mb-4"
    :style="{width: '400px',height: '370px'}"
  >
    <iframe ref="preview" class="bg-white w-full h-full" />
    <div ref="container" class="hidden">
      <slot />
    </div>
  </div>
</template>

<script>
import { SandpackClient } from 'smooshpack'

export default {
  data () {
    return { files: {} }
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
  },
  methods: {
    update () {
      this.fetchFiles()
      if (this._preview) {
        this._preview.updatePreview(this.config)
      } else {
        this._preview = new SandpackClient(this.$refs.preview, this.config, this.clientOptions)
      }
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
