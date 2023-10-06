<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'

const tabIconMap = {
  npm: 'logos:npm',
  yarn: 'vscode-icons:file-type-yarn',
  pnpm: 'vscode-icons:file-type-light-pnpm',
  mdc: 'mdi:language-markdown',
  vue: 'vscode-icons:file-type-vue',
  nuxt: 'vscode-icons:file-type-nuxt',
  node: 'vscode-icons:file-type-node',
  html: 'vscode-icons:file-type-html',
  css: 'vscode-icons:file-type-css',
  js: 'vscode-icons:file-type-js-official',
  javascript: 'vscode-icons:file-type-js-official',
  ts: 'vscode-icons:file-type-typescript-official',
  typescript: 'vscode-icons:file-type-typescript-official'
}

defineProps({
  tabs: {
    type: Array as PropType<{ label: string }[]>,
    required: true
  },
  activeTabIndex: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:activeTabIndex'])

const tabsRef = ref()

const updateTabs = ($event: any, i: any) => {
  emit('update:activeTabIndex', i)
}

const showTabIcon = (label: string) => {
  return Object.keys(tabIconMap).includes(label.toLowerCase())
}

const tabIcon = (label: string) => {
  return (tabIconMap as any)[label.toLowerCase()]
}
</script>

<template>
  <div class="code-group-tabs relative">
    <div
      v-if="tabs"
      ref="tabsRef"
      class="tabs relative z-0 flex overflow-x-auto"
      :class="[tabs.length === 2 && 'two-tabs']"
    >
      <button
        v-for="({ label }, i) in tabs"
        :key="`${i}${label}`"
        class="flex items-center flex-1 py-2 px-4 relative font-mono text-sm tracking-tight [.two-tabs_&&:first-of-type]:border-e [&.active]:border-b-transparent [&.inactive]:border-b [&.active]:border-b first-of-type:border-0 last-of-type:border-0 border-x border-primary-static text-start select-none [&.inactive]:bg-gray-100 [&.inactive]:dark:bg-black [&.inactive]:text-gray-500 [&.inactive]:hover:text-gray-900 [&.inactive]:hover:dark:text-gray-300 [&.active]:text-gray-900 [&.active]:dark:text-gray-300 [&.inactive]:grayscale [&.inactive]:hover:grayscale-0"
        :class="[activeTabIndex === i ? 'active' : 'inactive']"
        @click="updateTabs($event, i)"
      >
        <Icon
          v-if="showTabIcon(label)"
          :name="tabIcon(label)"
          class="w-4 h-4 me-2"
        />
        {{ label }}
      </button>
    </div>

    <slot name="footer" />
  </div>
</template>
