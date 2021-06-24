<template>
  <vscode-icons:default-folder-opened v-if="isDir && file.isOpen" />
  <vscode-icons:default-folder v-else-if="isDir" />
  <mdi:language-markdown v-else-if="isMarkdown" />
  <vscode-icons:file-type-vue v-else-if="isVue" />
  <heroicons-outline:photograph v-else-if="isImage" />
  <heroicons-outline:document v-else />
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue3'
import { isImage as isFileImage } from '../utils'

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})

const isDir = computed(() => props.file.type === 'directory')
const isImage = computed(() => isFileImage(props.file))
const isMarkdown = computed(() => props.file.extension === '.md')
const isVue = computed(() => props.file.extension === '.vue')
</script>
