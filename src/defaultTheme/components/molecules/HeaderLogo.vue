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
          <img v-if="$colorMode.value === 'light'" :src="logo.light" class="w-auto h-8" :alt="settings.title" />
          <img v-if="$colorMode.value === 'dark'" :src="logo.dark" class="w-auto h-8" :alt="settings.title" />
        </span>
        <span class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {{ settings.title }}
        </span>
      </div>
    </template>

    <template v-if="!theme.header.title && theme.header.logo">
      <span>
        <img v-if="$colorMode.value === 'light'" :src="logo.light" class="w-auto h-8" :alt="settings.title" />
        <img v-if="$colorMode.value === 'dark'" :src="logo.dark" class="w-auto h-8" :alt="settings.title" />
      </span>
    </template>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()

    const settings = computed(() => $docus.settings.value)
    const theme = computed(() => $docus.theme.value)

    const logo = computed(() => {
      if (!theme.value.logo) return

      if (typeof theme.value.logo === 'object') return theme.value.logo

      return {
        light: theme.value.logo,
        dark: theme.value.logo
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
