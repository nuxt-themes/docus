<template>
  <div class="flex items-center" @click.right.prevent="$router.push('/design')">
    <span>
      <img :src="logo.light" class="w-auto h-6 md:h-8 dark:hidden" :alt="settings.title" />
      <img :src="logo.dark" class="w-auto h-6 md:h-8 light:hidden" :alt="settings.title" />
    </span>
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
      if (!theme.value.header.logo) return

      if (typeof theme.value.header.logo === 'object') return theme.value.header.logo

      return {
        light: theme.value.header.logo,
        dark: theme.value.header.logo
      }
    })

    return {
      settings,
      logo
    }
  }
})
</script>
