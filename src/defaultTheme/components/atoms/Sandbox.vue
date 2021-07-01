<template>
  <div ref="box" class="w-full min-h-[500px] mx-auto mb-6 overflow-hidden text-3xl rounded-md sandbox">
    <TabsHeader ref="tabs-header" :active-tab-index="activeTabIndex" :tabs="providersTabs" @update="updateTab">
      <div slot="footer" class="absolute top-1/2 transform -translate-y-1/2 right-0 px-2">
        <Link class="flex items-center text-gray-500 dark:text-gray-400" :to="url" blank>
          <IconExternalLink class="h-5 w-5" />
        </Link>
      </div>
    </TabsHeader>

    <iframe
      v-if="isIntersecting && url"
      :src="url"
      title="Sandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full h-full min-h-[500px] overflow-hidden"
    />
    <span v-else class="text-white flex-1">Loading Sandbox...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * Url to Sandbox embed
     */
    src: {
      type: String,
      default: undefined
    },
    /**
     * Github Repository
     */
    repo: {
      type: String,
      default: undefined
    },
    /**
     * Target branch
     */
    branch: {
      type: String,
      default: undefined
    },
    dir: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const { $docus, $colorMode } = useContext()
    const repository = props.repo || $docus.settings.github?.repo
    const providers = {
      CodeSandBox: () =>
        `https://codesandbox.io/embed/github/${repository}/tree/${props.branch}/${props.dir}?hidenavigation=1&theme=${$colorMode.value}`,
      StackBlitz: () =>
        `https://stackblitz.com/github/${repository}/tree/${props.branch}/${props.dir}?embed=1&hideExplorer=1&hideNavigation=1&theme=${$colorMode.value}`
    }
    const providersTabs = Object.keys(providers).map(p => ({ label: p }))
    const box = ref()
    const activeTabIndex = ref(0)
    const url = ref('')
    const provider = ref('')
    const observer = ref(null)
    const isIntersecting = ref(false)

    function updateTab(i) {
      activeTabIndex.value = i
      changeProvider(providersTabs[i].label)
    }

    onMounted(() => {
      provider.value = window.localStorage.getItem('docus_sandbox') || 'CodeSandBox'

      url.value = props.src || providers[provider.value]()

      if (!window.IntersectionObserver) {
        isIntersecting.value = true
        return
      }

      observer.value = new window.IntersectionObserver(entries => {
        entries.forEach(({ intersectionRatio }) => {
          if (intersectionRatio > 0) {
            isIntersecting.value = true
            observer.value.disconnect()
            observer.value = null
          }
        })
      })

      observer.value.observe(box.value)
    })

    onBeforeUnmount(() => {
      if (observer.value) observer.value.disconnect()
    })

    const changeProvider = value => {
      provider.value = value
      url.value = props.src || providers[provider.value]()
      localStorage.setItem('docus_sandbox', value)
    }

    return {
      isIntersecting,
      box,
      provider,
      url,
      changeProvider,
      updateTab,
      activeTabIndex,
      providersTabs
    }
  }
})
</script>

<style lang="postcss" scoped>
.sandbox,
.sandbox iframe {
  @apply w-full rounded-md rounded-tl-none rounded-tr-none overflow-hidden h-64;
  height: 650px;
}
</style>
