<template>
  <Splitpanes class="h-full default-theme" :push-other-panes="false">
    <Pane>
      <Editor v-if="currentFile" :file="currentFile" api-entry="/config" />
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
import Editor from '../components/Editor.vue'
import Preview from '../components/Preview.vue'
import { useApi } from '../plugins/api'

const api = useApi()
const currentFile = ref(null)

const openFile = async () => {
  currentFile.value = await api.get('/config')
  console.log(currentFile.value)
}

onMounted(() => {
  openFile()
})
</script>
