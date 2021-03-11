<template>
  <AppContainer aside fluid>
    <template #header>
      <AppHeader>
        <template #desktop-right>
          <NuxtLink to="/get-started/installation" class="inline-flex items-center flex-none px-3 py-2 text-base font-semibold leading-4 text-white transition-colors duration-200 border border-transparent rounded bg-primary-500 hover:bg-primary-600">Get started</NuxtLink>
        </template>
      </AppHeader>
    </template>
    <template #aside>
      <AppAside class="block lg:hidden" />
    </template>
    <section class="px-4 mx-auto my-24 max-w-8xl">

      <div class="flex flex-col lg:flex-row">
        <div class="flex flex-col items-center pr-0 mb-8 lg:items-start lg:pr-8 lg:w-2/3">
          <h1
            class="my-8 text-4xl font-semibold leading-none tracking-tight text-center text-gray-900 lg:text-left dark:text-gray-100 sm:text-6xl lg:text-7xl sm:my-12"
          >
            Documentation generator<br />based on Nuxt and Tailwind.
          </h1>
          <h3 class="mb-4 text-lg text-center text-gray-700 lg:text-left sm:text-xl lg:text-2xl sm:leading-tight sm:mb-8 dark:text-gray-300">
            Write in markdown, use Vue components, add style with TailwindCSS
            and enjoy the power of Nuxt.
          </h3>
          <div class="flex items-center space-x-6">
            <ButtonLink
              class="mx-auto md:mx-0"
              size="large"
              href="/get-started/installation"
            >
              Get started
            </ButtonLink>
            <a href="https://github.com/nuxtlabs/docus" class="pt-px mt-px font-medium text-gray-800 border-b-2 border-transparent dark:text-gray-100 hover:border-gray-800 dark:hover:border-gray-100">Open on GitHub</a>
          </div>
        </div>
        <div class="w-full m-auto lg:w-1/3 sm:w-580px ">
          <div class="md:pl-2">
            <Terminal snippet="npx degit nuxtlabs/docus-starter#main docs" />
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="px-4 mx-auto max-w-8xl">
        <h2
          class="mb-8 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          What’s included?
        </h2>
        <ul
          class="grid gap-4 font-semibold text-left text-gray-900 dark:text-gray-100 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-8"
        >
          <li v-for="feature of features" :key="feature.title" class="flex">
            <div class="relative w-full px-6 py-8 bg-white rounded shadow dark:bg-gray-900 hover:shadow-lg">
              <component
                :is="feature.icon"
                v-if="feature.icon"
                class="h-16 max-w-full mb-3"
              />
              <h2 class="mb-2 text-xl">{{ feature.title }}</h2>
              <p class="font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum voluptatibus veritatis maxime est qui blanditiis aut libero quod. Doloremque obcaecati voluptate tenetur quia fuga veniam incidunt rerum voluptatibus iusto earum.</p>
              <!-- TODO: feature.description -->
            </div>
          </li>
        </ul>
      </div>
    </section>
  </AppContainer>
</template>

<script>
export default {
  data () {
    return {
      features: [
        {
          icon: 'IconMarkdown',
          title: 'Write Markdown'
        },
        {
          icon: 'IconVue',
          title: 'Vue Components'
        },
        {
          icon: 'IconNuxt',
          title: 'Nuxt Architecture'
        },
        {
          icon: 'IconTailwind',
          title: 'Tailwind CSS'
        },
        {
          icon: 'IconSSG',
          title: 'Static Generation'
        },
        {
          icon: 'IconLighthouse',
          title: 'Lighthouse Optimised'
        },
        {
          icon: 'IconZap',
          title: 'Smart Generation'
        },
        {
          icon: 'IconPuzzle',
          title: 'Extensible'
        }
      ]
    }
  },
  computed: {
    menu () {
      return this.$menu.open
    }
  },
  watch: {
    menu (val) {
      if (val) {
        this.blockBodyScroll()
      } else {
        this.unblockBodyScroll()
      }
    }
  },
  methods: {
    blockBodyScroll () {
      const scrollBarGap =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarGap}px`
    },
    unblockBodyScroll () {
      setTimeout(() => {
        document.body.style.overflow = null
        document.body.style.paddingRight = null
      }, 16)
    }
  }
}
</script>
