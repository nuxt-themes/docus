<template>
  <Splitpanes class="h-full default-theme">
    <Pane size="15" max-size="30">
      <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
    </Pane>
    <Pane>
      <Editor v-if="currentFile" :file="currentFile" />
      <p v-else class="p-4 opacity-75">👈 &nbsp;Select a file to edit.</p>
    </Pane>
    <Pane>
      <KeepAlive>
        <Preview />
      </KeepAlive>
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import { ref, onMounted } from 'vue3'
import FilesTree from '../components/FilesTree.vue'
import Editor from '../components/Editor.vue'
import Preview from '../components/Preview.vue'
import { useApi } from '../plugins/api'
import { navigateToFile } from '../composables/preview'

const api = useApi()

const files = ref([])
const currentFile = ref(null)

const openFile = async file => {
  navigateToFile(file.path)
  currentFile.value = await api.get(`/content${file.path}`)
}

onMounted(async () => {
  files.value = await api.get('/content')

  if (!currentFile.value) {
    const indexFile = files.value.find(file => file.path === '/index.md')
    if (indexFile) {
      openFile(indexFile)
    }
  }
})
</script>
