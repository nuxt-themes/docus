<script setup lang="ts">
import { computed, onMounted, ref, useColorMode } from '#imports'

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

const providersTabs = Object.keys(providers).map((p) => ({ label: p }))
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
})
</script>

<template>
  <div class="sandbox my-4 min-h-[500px] w-full">
    <TabsHeader v-if="!src" ref="tabs" :active-tab-index="activeTabIndex" :tabs="providersTabs" @update:active-tab-index="updateTab">
      <template #footer>
        <div class="absolute top-1/2 right-0 -translate-y-1/2 transform px-4">
          <NuxtLink class="text-secondary hover:text-secondary-hover flex items-center" :to="sandBoxUrl" target="_blank">
            <Icon name="heroicons-outline:arrows-expand" class="h-6 w-6" />
          </NuxtLink>
        </div>
      </template>
    </TabsHeader>

    <iframe
      v-if="url"
      :src="url"
      title="Sandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="h-full min-h-[700px] w-full overflow-hidden"
    />

    <span v-else class="flex-1 text-white">Loading Sandbox...</span>
  </div>
</template>

<style lang="postcss" scoped>
.sandbox {
  @apply overflow-hidden rounded-lg bg-white text-3xl dark:bg-gray-900;

  iframe {
    @apply h-64 w-full overflow-hidden rounded-lg rounded-tl-none rounded-tr-none;
    height: 700px;
  }
}
</style>
