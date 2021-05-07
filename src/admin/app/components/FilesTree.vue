<template>
  <ul>
    <li
      v-for="file of files"
      :key="file.path"
      class="rounded text-gray-600"
      :class="{ 'bg-gray-200 text-gray-900': isCurrent(file) }"
    >
      <div
        class="group flex cursor-pointer items-center px-1 py-1 text-sm leading-5 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
        @click="open(file)"
      >
        <FilesTreeIcon :file="file" />
        <span>{{ file.name }}</span>
      </div>
      <FilesTree
        v-if="isDir(file) && file.isOpen"
        :files="file.children"
        :current-file="currentFile"
        :is-root="false"
        class="pl-2"
        @open="open"
      />
    </li>
  </ul>
</template>

<script>
import { defineComponent, provide } from 'vue3'
import { isImage } from '../utils'
import FilesTreeIcon from './FilesTreeIcon.vue'

export default defineComponent({
  name: 'FilesTree',
  components: { FilesTreeIcon },
  props: {
    isRoot: {
      type: Boolean,
      default: true
    },
    files: {
      type: Array,
      default: () => []
    },
    currentFile: {
      type: Object,
      default: null
    }
  },
  setup(props, { emit }) {
    function isDir(file) {
      return file.type === 'directory'
    }

    function isCurrent(file) {
      return props.currentFile && file.path === props.currentFile.path
    }

    function hasOneDir(files) {
      return files.find(file => isDir(file))
    }

    function open(file) {
      if (isDir(file)) {
        file.isOpen = !file.isOpen
        return
      }

      emit('open', file)
    }

    provide('tree-helpers', { isDir, isCurrent, isImage, hasOneDir, open })

    return { isImage, isDir, hasOneDir, isCurrent, open }
  }
})
</script>
