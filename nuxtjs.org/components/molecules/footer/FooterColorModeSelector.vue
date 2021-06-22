<template>
  <NuxtSelectNative
    v-model="$colorMode.preference"
    :options="[
      { value: 'system', text: 'System' },
      { value: 'light', text: 'Light' },
      { value: 'dark', text: 'Dark' }
    ]"
    select-class="appearance-none font-sans block w-full d-body-bg border light:border-gray-200 dark:border-secondary-dark rounded-md py-2 pl-3 pr-10 text-base light:text-gray-500 dark:text-secondary-surface focus:outline-none light:focus:ring-black dark:focus:ring-white light:focus:border-gray-400 dark:focus:border-secondary-light sm:text-sm"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ColorModeSelector'
})
</script>
