<template>
  <ul>
    <li
      v-for="file of files"
      :key="file.path"
      class="rounded"
      :class="isCurrent(file) ? 'bg-gray-400 bg-opacity-20' : 'opacity-75'"
    >
      <div
        v-if="!isHidden(file)"
        class="
          group
          flex
          cursor-pointer
          items-center
          px-1
          py-1
          text-sm
          leading-5
          rounded
          hover:bg-gray-400 hover:bg-opacity-15
        "
        @click="open(file)"
      >
        <FilesTreeIcon :file="file" />
        <span>{{ filename(file.name) }}</span>
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
    const isDir = file => file.type === 'directory'
    const isHidden = file => file.path.startsWith('/_') || file.path.startsWith('/.') || file.path.endsWith('.js')

    const isCurrent = file => props.currentFile && file.path === props.currentFile.path

    const hasOneDir = files => files.find(file => helpers.isDir(file))

    const filename = name => name.replace(/^\d+\./, '')

    const open = file => {
      if (isDir(file)) {
        file.isOpen = !file.isOpen
        return
      }

      emit('open', file)
    }

    const helpers = {
      isDir,
      isHidden,
      isCurrent,
      hasOneDir,
      filename,
      open,
      isImage
    }

    provide('tree-helpers', helpers)

    return helpers
  }
})
</script>
