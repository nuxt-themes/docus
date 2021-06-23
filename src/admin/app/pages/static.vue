<template>
  <Splitpanes class="h-full default-theme" :push-other-panes="false">
    <Pane size="15" max-size="30">
      <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
    </Pane>
    <Pane>
      <div
        v-if="isImage(currentFile)"
        class="flex-1 items-start justify-start h-full flex"
        style="background: url('/admin/transparent.png') repeat"
      >
        <img :src="previewUrl + currentFile.path" class="m-auto" />
      </div>
      <Editor v-else-if="currentFile" v-model="currentFile.data" :file="currentFile" />
      <p v-else class="p-4 text-gray-700">👈 &nbsp;Select a file.</p>
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import { onMounted, ref } from 'vue3'
import FilesTree from '../components/FilesTree.vue'
import Editor from '../components/Editor.vue'
import { useApi } from '../plugins/api'
import { isImage } from '../utils'
import { previewUrl } from '../composables/preview'

const api = useApi()
const files = ref([])
const currentFile = ref(null)

onMounted(async () => {
  files.value = await api.get('/static')
})

async function openFile(file) {
  if (isImage(file)) {
    currentFile.value = file
  } else {
    currentFile.value = await api.get(`/static${file.path}`)
  }
}
</script>
