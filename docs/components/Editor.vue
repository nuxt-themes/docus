<template>
  <EditorContent :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import { defaultExtensions } from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent
  },

  props: {
    value: {
      type: [String, Object],
      default: ''
    }
  },

  data() {
    return {
      editor: null
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getJSON() === value

      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.value, false)
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: defaultExtensions(),
      content: this.value
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
