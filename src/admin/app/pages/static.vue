<template>
  <!-- eslint-ignore-file -->
  <div class="flex flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow border-r border-gray-r-200 bg-white overflow-y-auto">
        <div class="mt-2 flex-grow flex flex-col">
          <nav class="flex-1 px-2 bg-white space-y-1">
            <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div class="flex flex-col flex-1 overflow-hidden border-r">
    <div
      v-if="isImage(currentFile)"
      class="flex-1 items-start justify-start"
      style="background: url('/transparent.png') repeat"
    >
      <img :src="previewUrl + currentFile.path" />
    </div>
    <Editor v-else-if="currentFile" v-model="currentFile.data" :file="currentFile" />
    <p v-else class="p-4 text-gray-700">👈 &nbsp;Select a file.</p>
  </div>
</template>

<script>
import FilesTree from '../components/FilesTree.vue'
import Editor from '../components/Editor.vue'
import { isImage } from '../utils'

export default {
  components: {
    FilesTree,
    Editor
  },
  inject: ['previewUrl'],
  setup() {
    return { isImage }
  },
  data() {
    return {
      files: [],
      currentFile: null
    }
  },
  async mounted() {
    this.files = await this.$api.get('/static')
  },
  methods: {
    async openFile(file) {
      if (this.isImage(file)) {
        this.currentFile = file
      } else {
        this.currentFile = await this.$api.get(`/static${file.path}`)
      }
    }
  }
}
</script>
