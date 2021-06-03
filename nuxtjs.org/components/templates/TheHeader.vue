<template>
  <header
    class="
      sticky
      top-0
      left-0
      right-0
      z-30
      bg-light-elevatedSurface
      dark:bg-dark-elevatedSurface
      h-16
      lg:h-24
      transition-colors
      duration-300
      ease-linear
    "
    :class="{ shadow: !onTop, 'shadow-reverse': onTop }"
  >
    <div
      class="container relative mx-auto px-4 flex items-center lg:py-6 h-full"
    >
      <!-- Logo -->
      <NuxtLink
        class="inline-block text-nuxt-gray h-7 lg:h-10 z-10 mr-auto"
        to="/"
        @click.native.right.stop.prevent="$router.push('/design')"
      >
        <h1 class="m-0 h-0 w-0 overflow-hidden">NUXTJS</h1>
        <SvgIcon
          name="logo"
          class="
            h-6
            lg:h-8
            text-light-onSurfacePrimary
            dark:text-dark-onSurfacePrimary
            transition-colors
            duration-300
            ease-linear
          "
        />
      </NuxtLink>
      <!-- Center Navigation -->
      <nav class="hidden lg:flex lg:pt-1 xl:pt-0 mx-auto">
        <ul class="flex text-center">
          <li
            v-for="link in $t('header.links')"
            :key="link.slug"
            class="xl:px-4 lg:py-0 lg:px-2 py-2"
          >
            <NuxtLink
              v-if="!link.href"
              class="
                block
                font-medium
                uppercase
                hover:no-underline
                light:hover:text-nuxt-lightgreen
                dark:hover:text-nuxt-lightgreen
                text-light-onSurfacePrimary
                dark:text-dark-onSurfacePrimary
                transition-colors
                duration-300
                ease-linear
              "
              :to="
                localePath({
                  name: link.slug,
                  params: { book: 'get-started', slug: 'installation' }
                })
              "
            >
              {{ link.name }}
            </NuxtLink>
            <a
              v-else
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener"
              class="
                block
                font-medium
                uppercase
                hover:no-underline
                hover:text-nuxt-lightgreen
                text-light-onSurfacePrimary
                dark:text-dark-onSurfacePrimary
                transition-colors
                duration-300
                ease-linear
              "
            >
              {{ link.name }}
              <span
                class="
                  bg-orange-500
                  text-white
                  dark:text-black
                  text-ss
                  align-top
                  px-1
                  rounded-sm
                  lowercase
                "
              >
                new
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- Algolia Search -->
      <AlgoliaSearch />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      onTop: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.onTop = window.pageYOffset < 60
    }
  }
}
</script>
