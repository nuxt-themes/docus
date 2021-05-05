<template>
  <ul>
    <li
      v-for="file of files"
      :key="file.path"
      class="rounded text-gray-600"
      :class="{ 'bg-gray-200 text-gray-900': isCurrent(file) }"
    >
      <!-- Heroicon name: folder -->
      <div
        class="group flex cursor-pointer items-center px-1 py-1 text-sm leading-5 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
        @click="open(file)"
      >
        <svg
          v-if="isDir(file) && file.isOpen"
          class="mr-1 h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <svg
          v-else-if="isDir(file)"
          class="mr-1 h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span v-else-if="!isRoot || hasOneDir(files)" class="mr-1 inline-block h-4 w-4"></span>
        <svg
          v-if="isDir(file)"
          class="mr-1 h-5 w-5 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <svg
          v-else-if="isImage(file)"
          class="mr-1 h-5 w-5 text-gray-500"
          :class="{ 'text-gray-600': isCurrent(file) }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <svg
          v-else
          class="mr-1 h-5 w-5 text-gray-500"
          :class="{ 'text-gray-600': isCurrent(file) }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
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
import { isImage } from '../utils'

export default {
  name: 'FilesTree',
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
  setup() {
    return { isImage }
  },
  methods: {
    isDir(file) {
      return file.type === 'directory'
    },
    isCurrent(file) {
      return this.currentFile && file.path === this.currentFile.path
    },
    hasOneDir(files) {
      return files.find(file => this.isDir(file))
    },
    open(file) {
      if (this.isDir(file)) {
        file.isOpen = !file.isOpen
        return
      }
      this.$emit('open', file)
    }
  }
}
</script>
