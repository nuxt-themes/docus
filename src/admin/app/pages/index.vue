<template>
  <aside class="w-64 p-2 relative d-border border-r">
    <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
  </aside>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div class="flex-1 d-border border-r">
    <Editor v-if="currentFile" :file="currentFile" />

    <p v-else class="p-4 opacity-75">👈 &nbsp;Select a file to edit.</p>
  </div>
</template>

<script>
import { reactive, defineComponent, onMounted, toRefs } from 'vue3'
import FilesTree from '../components/FilesTree.vue'
import Editor from '../components/Editor.vue'
import { useApi } from '../plugins/api'
import { navigateToFile } from '../composables/preview'

export default defineComponent({
  components: {
    FilesTree,
    Editor
  },
  setup() {
    const api = useApi()

    const state = reactive({
      files: [],
      currentFile: null
    })

    const openFile = async file => {
      navigateToFile(file.path)
      state.currentFile = await api.get(`/content${file.path}`)
    }

    onMounted(async () => {
      state.files = await api.get('/content')

      if (!state.currentFile) {
        const indexFile = state.files.find(file => file.path === '/index.md')
        if (indexFile) {
          openFile(indexFile)
        }
      }
    })

    return {
      ...toRefs(state),
      openFile
    }
  }
})
</script>
