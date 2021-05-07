<template>
  <aside class="w-64 p-2 relative border-r">
    <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
  </aside>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div class="flex-1 overflow-y-scroll border-r">
    <Editor v-if="currentFile" v-model="currentFile.data" :file="currentFile" />

    <p v-else class="p-4 text-gray-700">👈 &nbsp;Select a file to edit.</p>
  </div>
</template>

<script>
import FilesTree from '../components/FilesTree.vue'
import Editor from '../components/Editor.vue'

export default {
  components: {
    FilesTree,
    Editor
  },
  data() {
    return {
      files: [],
      currentFile: null
    }
  },
  async mounted() {
    this.files = await this.$api.get('/pages')
  },
  methods: {
    async openFile(file) {
      this.currentFile = await this.$api.get(`/pages${file.path}`)
    }
  }
}
</script>
