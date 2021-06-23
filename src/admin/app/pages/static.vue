<template>
  <Splitpanes class="h-full default-theme">
    <Pane size="15" max-size="30">
      <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
    </Pane>
    <Pane>
      <div
        v-if="isImage(currentFile)"
        class="flex-1 items-start justify-start"
        style="background: url('/transparent.png') repeat"
      >
        <img :src="previewUrl + currentFile.path" />
      </div>
      <Editor v-else-if="currentFile" v-model="currentFile.data" :file="currentFile" />
      <p v-else class="p-4 text-gray-700">👈 &nbsp;Select a file.</p>
    </Pane>
  </Splitpanes>
  <!--
  <div class="flex flex-shrink-0">
    <div class="flex flex-col w-64">
      <div class="flex flex-col flex-grow d-border border-r border-gray-r-200 overflow-y-auto">
        <div class="mt-2 flex-grow flex flex-col">
          <nav class="flex-1 px-2 space-y-1">
            <FilesTree :files="files" :current-file="currentFile" @open="openFile" />
          </nav>
        </div>
      </div>
    </div>
  </div>

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
  </div> -->
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
