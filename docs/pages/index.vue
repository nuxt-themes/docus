<template>
  <Container>
    <Page>
      <h1 class="mt-10 mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl lg:text-7xl sm:mt-14 sm:mb-10">
        Documentation generator<br>based on Nuxt and Tailwind.
      </h1>
      <h3 class="mb-10 text-lg font-medium text-gray-800 sm:text-2xl sm:leading-10 sm:mb-11 dark:text-gray-200">
        Write in markdown, use Vue components, add style with TailwindCSS
        and enjoy the power of Nuxt.
      </h3>
      <div class="flex flex-wrap space-y-4 text-center sm:space-y-0 sm:space-x-4">
        <ButtonLink size="large" href="/get-started/installation">Get started</ButtonLink>
        <button
          ref="copyInstall"
          data-clipboard-text="npx degit nuxtlabs/docus-starter#main my-docs"
          type="button"
          class="flex items-center justify-center flex-none w-full py-3 space-x-2 font-mono leading-6 text-gray-400 transition-colors duration-200 border border-gray-200 dark:border-gray-700 sm:w-auto bg-gray-50 dark:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 sm:px-6 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-600 focus:ring-gray-300 dark:focus:ring-gray-700 focus:outline-none"
        >
          <span class="text-gray-900 dark:text-gray-100">
            <span class="hidden text-gray-500 sm:inline" aria-hidden="true">$ </span>
            npx degit nuxtlabs/docus-starter
          </span>
          <span class="sr-only">(click to copy to clipboard)</span>
          <IconClipboardCheck v-if="copied" class="w-6 h-6 text-green-400" stroke-width="1.5" />
          <IconClipboardCopy v-else class="w-6 h-6" stroke-width="1.5" />
        </button>
      </div>
      <section>
        <h2 class="mt-16 mb-8 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">What’s included?</h2>
        <ul class="grid grid-cols-2 gap-4 font-semibold text-center text-gray-900 dark:text-gray-100 sm:grid-cols-3 xl:grid-cols-4 sm:gap-6 xl:gap-8">
          <li v-for="feature of features" :key="feature.title" class="flex">
            <NuxtLink class="relative w-full px-6 pt-8 pb-6 border-2 border-gray-100 rounded-xl dark:border-gray-800" :to="feature.url">
              <component :is="feature.icon" v-if="feature.icon" class="h-16 max-w-full mx-auto mb-3" />
              <h2>{{ feature.title }}</h2>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </Page>
  </Container>
</template>

<script>
import Clipboard from 'clipboard'

export default {
  data () {
    return {
      copied: false,
      features: [
        {
          icon: 'IconMarkdown',
          title: 'Write Markdown',
          url: '/usage/template'
        },
        {
          icon: 'IconVue',
          title: 'Vue Components',
          url: '/usage/components'
        },
        {
          icon: 'IconNuxt',
          title: 'Nuxt Architecture',
          url: '/get-started/configuration#nuxt'
        },
        {
          icon: 'IconTailwind',
          title: 'Tailwind CSS',
          url: '/get-started/configuration#tailwindcss'
        },
        {
          icon: 'IconSSG',
          title: 'Static Generation',
          url: '/more/deployment'
        },
        {
          icon: 'IconLighthouse',
          title: 'Lighthouse Optimised',
          url: '/more/performances'
        },
        {
          icon: 'IconZap',
          title: 'Smart Generation',
          url: '/more/performances#smart-generation'
        },
        {
          icon: 'IconPuzzle',
          title: 'Extensible',
          url: '/usage/template'
        }
      ]
    }
  },
  mounted () {
    this.setupCopyInstall()
  },
  methods: {
    setupCopyInstall () {
      if (!this.$refs.copyInstall) {
        return this.$nextTick(this.setupCopyInstall)
      }
      const copyInstall = new Clipboard(this.$refs.copyInstall)
      copyInstall.on('success', () => {
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 1000)
      })
    }
  }
}
</script>
