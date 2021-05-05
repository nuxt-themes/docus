<template>
  <div class="flex flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow overflow-y-auto bg-white border-r border-gray-r-200">
        <div class="flex flex-col flex-grow mt-2">
          <nav class="flex-1 px-2 space-y-1 bg-white">
            <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div class="flex flex-col flex-1 overflow-hidden border-r">
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
