<template>
  <div class="flex items-center">
    <template v-if="settings.header.title && !settings.header.logo">
      <span class="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tighter">
        {{ settings.title }}
      </span>
    </template>

    <template v-if="settings.header.title && settings.header.logo">
      <div class="flex items-center">
        <span class="mr-4">
          <img :src="logo.light" class="w-auto h-8 light-img" :alt="settings.title" />
          <img :src="logo.dark" class="w-auto h-8 dark-img" :alt="settings.title" />
        </span>
        <span class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {{ settings.title }}
        </span>
      </div>
    </template>

    <template v-if="!settings.header.title && settings.header.logo">
      <span>
        <img :src="logo.light" class="w-auto h-8 light-img" :alt="settings.title" />
        <img :src="logo.dark" class="w-auto h-8 dark-img" :alt="settings.title" />
      </span>
    </template>

    <span class="inline-flex items-center px-2 ml-2 text-xs font-semibold text-white rounded-full bg-primary-500">
      beta
    </span>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()

    const settings = computed(() => $docus.settings)

    const logo = computed(() => {
      if (!settings.value.logo) return

      if (typeof settings.value.logo === 'object') return settings.value.logo

      return {
        light: settings.value.logo,
        dark: settings.value.logo
      }
    })

    return {
      settings,
      logo
    }
  }
})
</script>
