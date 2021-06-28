<template>
  <div
    ref="box"
    class="
      flex flex-col
      items-center
      justify-center
      w-full
      min-h-[500px]
      mx-auto
      mb-6
      overflow-hidden
      text-3xl text-center
      bg-black
      rounded-md
      sandbox
    "
    style="background-color: rgb(21, 21, 21)"
  >
    <div class="flex items-center justify-between w-full text-left relative z-0 p-2 text-base d-code-group-header-bg">
      <div v-if="repo" class="mr-2">
        <span class="text-gray-700 dark:text-gray-400 text-sm">Preview on </span>
        <Dropdown class="inline-flex">
          <template #trigger="{ toggle }">
            <button @touchstart.stop.prevent="toggle">
              {{ provider }}
            </button>
          </template>

          <ul class="py-1">
            <li>
              <button
                class="px-4 py-1 w-full flex items-center whitespace-no-wrap hover:bg-gray-900 hover:bg-opacity-25"
                @click="changeProvider('CodeSandBox')"
              >
                CodeSandBox
              </button>
            </li>
            <li>
              <button
                class="px-4 py-1 w-full flex items-center whitespace-no-wrap hover:bg-gray-900 hover:bg-opacity-25"
                @click="changeProvider('StackBlitz')"
              >
                StackBlitz
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>
      <div
        class="
          bg-gray-900
          flex
          items-center
          bg-opacity-25
          py-1
          px-2
          mr-2
          text-sm
          rounded-md
          overflow-x-scroll
          flex-1
          whitespace-pre
        "
      >
        {{ url }}
      </div>
      <Link class="" :to="url" blank>
        <IconExternalLink class="h-5 w-5" />
      </Link>
    </div>
    <iframe
      v-if="isIntersecting && src"
      :src="url"
      title="Sandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full h-full min-h-[500px] overflow-hidden"
    />
    <span v-else class="text-white">Loading Sandbox...</span>
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
    const { $docus } = useContext()
    const repository = props.repo || $docus.settings.github?.repo
    const providers = {
      CodeSandBox: () =>
        `https://codesandbox.io/s/github/${repository}/tree/${props.branch}/${props.dir}?hidenavigation=1&theme=dark`,
      StackBlitz: () =>
        `https://stackblitz.com/github/${repository}/tree/${props.branch}/${props.dir}?hidenavigation=1&theme=dark`
    }
    const box = ref()
    const url = ref('')
    const provider = ref('')
    const observer = ref(null)
    const isIntersecting = ref(false)

    onMounted(() => {
      provider.value = window.localStorage.getItem('docus_snadbox') || 'CodeSandBox'

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
      localStorage.setItem('docus_sandbox', value)
    }

    return {
      isIntersecting,
      box,
      provider,
      url,
      changeProvider
    }
  }
})
</script>

<style lang="postcss" scoped>
.sandbox,
.sandbox iframe {
  @apply w-full rounded-md overflow-hidden h-64;
  height: 650px;
}
</style>
