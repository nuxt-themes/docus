<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  repo: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  dir: {
    type: String,
    default: ''
  },
  file: {
    type: String,
    default: 'app.vue'
  }
})

const colorMode = useColorMode()

const providers = {
  CodeSandBox: () => `https://codesandbox.io/embed/github/${props.repo}/tree/${props.branch}/${props.dir}?hidenavigation=1&theme=${colorMode.value}`,
  StackBlitz: () => `https://stackblitz.com/github/${props.repo}/tree/${props.branch}/${props.dir}?embed=1&file=${props.file}&theme=${colorMode.value}`
}

const providersTabs = Object.keys(providers).map(p => ({ label: p }))
const activeTabIndex = ref(-1)
const tabs = ref()
const url = ref('')
const provider = ref('')

const changeProvider = (value) => {
  provider.value = value
  url.value = props.src || providers[provider.value]()
  localStorage.setItem('docus_sandbox', value)
}

// const sandBoxUrl = computed(() => url.value?.replace('?embed=1&', '?').replace('/embed/', '/s/'))

const updateTab = (i: number) => {
  activeTabIndex.value = i
  changeProvider(providersTabs[i].label)
}

onMounted(() => {
  // TODO: if Safari, use CodeSandBox by default: const defaultSandbox = ...
  provider.value = window.localStorage.getItem('docus_sandbox') || 'CodeSandBox'

  url.value = props.src || providers[provider.value]()

  // Set active tab
  activeTabIndex.value = Object.keys(providers).indexOf(provider.value)
})
</script>

<template>
  <div class="sandbox">
    <CodeGroupTabs v-if="!src" ref="tabs" :active-tab-index="activeTabIndex" :tabs="providersTabs" @update:active-tab-index="updateTab" />

    <iframe
      v-if="url"
      :src="url"
      title="Sandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />

    <span v-else>Loading Sandbox...</span>
  </div>
</template>

<style scoped lang="ts">
css({
  '.sandbox': {
    '--sandbox-height': '700px',
    backgroundColor: '{elements.surface.primary.backgroundColor}',
    width: '100%',
    height: 'var(--sandbox-height)',
    overflow: 'hidden',
    fontSize: '{text.3xl.fontSize}',
    lineHeight: '{text.3xl.lineHeight}',
    border: '1px solid {elements.border.secondary.static}',
    borderRadius: '{radii.md}',
    iframe: {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }
  }
})
</style>
