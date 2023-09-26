<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import appConfig from '#build/app.config'

const { tokens } = appConfig

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
      class="tabs"
      :class="[tabs.length === 2 && 'two-tabs', tokens.codeGroupTabs.tabs]"
    >
      <button
        v-for="({ label }, i) in tabs"
        :key="`${i}${label}`"
        :class="[activeTabIndex === i ? 'active' : 'inactive', Object.values(tokens.codeGroupTabs.tab)]"
        @click="updateTabs($event, i)"
      >
        <Icon
          v-if="showTabIcon(label)"
          :name="tabIcon(label)"
          :class="[tokens.codeGroupTabs.icon]"
        />
        {{ label }}
      </button>
    </div>

    <slot name="footer" />
  </div>
</template>
