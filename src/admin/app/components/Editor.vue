<template>
  <PrismEditor v-model="value" class="editor" :highlight="highlighter" line-numbers />
</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  components: {
    PrismEditor
  },
  props: {
    file: {
      type: Object,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
        this.$api.put(`/pages${this.file.path}`, {
          data: value
        })
      }
    },
    language() {
      const extensionsMap = {
        '.md': 'markdown',
        '.json': 'json',
        '.js': 'js'
      }
      return extensionsMap[this.file.extension] || 'markup'
    }
  },
  methods: {
    highlighter(code) {
      return window.Prism.highlight(code, window.Prism.languages[this.language])
    }
  }
}
</script>

<style>
/* Required class */
.editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* Optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
