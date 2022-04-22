<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  repo: {
    type: String,
    default: '',
  },
  branch: {
    type: String,
    default: '',
  },
  dir: {
    type: String,
    default: '',
  },
  file: {
    type: String,
    default: 'app.vue',
  },
})

const colorMode = useColorMode()

const providers = {
  CodeSandBox: () => `https://codesandbox.io/embed/github/${props.repo}/tree/${props.branch}/${props.dir}?hidenavigation=1&theme=${colorMode.value}`,
  StackBlitz: () => `https://stackblitz.com/github/${props.repo}/tree/${props.branch}/${props.dir}?embed=1&file=${props.file}&theme=${colorMode.value}`,
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

const sandBoxUrl = computed(() => url.value?.replace('?embed=1&', '?').replace('/embed/', '/s/'))

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

  setTimeout(() => tabs.value.updateTabs(activeTabIndex.value), 100)
})
</script>

<template>
  <div class="w-full min-h-[500px] mx-auto mb-6 overflow-hidden text-3xl rounded-md sandbox mt-4">
    <TabsHeader
      v-if="!src"
      ref="tabs"
      :active-tab-index="activeTabIndex"
      :tabs="providersTabs"
      @update:active-tab-index="updateTab"
    >
      <template #footer>
        <div class="absolute top-1/2 transform -translate-y-1/2 right-0 px-2">
          <Link class="flex items-center text-gray-500 dark:text-gray-400" :to="sandBoxUrl" blank>
            <IconExternalLink class="h-5 w-5" />
          </Link>
        </div>
      </template>
    </TabsHeader>

    <iframe
      v-if="url"
      :src="url"
      title="Sandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full h-full min-h-[700px] overflow-hidden bg-gray-100 dark:bg-gray-800"
    />

    <span v-else class="text-white flex-1">Loading Sandbox...</span>
  </div>
</template>

<style lang="postcss" scoped>
.sandbox,
.sandbox iframe {
  @apply w-full rounded-md rounded-tl-none rounded-tr-none overflow-hidden h-64;
  height: 700px;
}
</style>
