<template>
  <div class="flex items-center">
    <template v-if="theme.header.title && !theme.header.logo">
      <span class="text-2xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">
        {{ settings.title }}
      </span>
    </template>

    <template v-if="theme.header.title && theme.header.logo">
      <div class="flex items-center">
        <span class="mr-4">
          <Component :is="logo.inline" v-if="logo.inline" class="w-auto h-6 md:h-8" />
          <img v-else :src="logo.src" class="w-auto h-6 md:h-8 dark:hidden" :alt="settings.title" />
        </span>
        <span class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {{ settings.title }}
        </span>
      </div>
    </template>

    <template v-if="!theme.header.title && theme.header.logo">
      <span>
        <Component :is="logo.inline" v-if="logo.inline" class="w-auto h-6 md:h-8" />
        <img v-else :src="logo.src" class="w-auto h-6 md:h-8 dark:hidden" :alt="settings.title" />
      </span>
    </template>
  </div>
</template>

<script>
import { computed, defineComponent, useAsync, useContext, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus, $colorMode, $img } = useContext()
    const settings = computed(() => $docus.settings.value)
    const theme = computed(() => $docus.theme.value)

    const logo = computed(() => {
      if (!theme.value.header.logo) return
      const color = $colorMode.value === 'dark' ? 'dark' : 'light'

      const logo = theme.value.header.logo[color] || theme.value.header.logo
      const isInline = !process.dev && logo.endsWith('.svg')

      if (!isInline) {
        return {
          src: $img(logo)
        }
      }
      return {
        inline: () =>
          import(logo.startsWith('/') ? `~/static${logo}` : logo /* @vite-ignore */).then(res => res.default || res)
      }
    })

    return {
      settings,
      logo,
      theme
    }
  }
})
</script>
