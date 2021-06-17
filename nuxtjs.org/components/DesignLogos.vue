<template>
  <div>
    <div v-for="content in logosMd" :key="content.slug" class="grid grid-cols-1 sm:grid-cols-3 sm:gap-6">
      <div v-for="logo in content.logos" :key="logo.slug" class="mt-4">
        <div
          class="border px-12 py-10 flex justify-center rounded-md"
          :class="logo.color === 'light' ? 'bg-secondary-black border-white' : 'bg-white'"
        >
          <img :src="`${logo.logoImg}.svg`" />
        </div>
        <div class="flex w-full justify-between pt-2 pb-4">
          <div class="font-semibold">{{ logo.type }}</div>
          <div class="flex space-x-2">
            <ALink
              class="hover:text-primary-green light:text-gray-500 dark:white hover:underline"
              :href="`${logo.logoImg}.svg`"
              aria-label="Download svg"
              download
              >SVG</ALink
            >
            <ALink
              class="hover:text-primary-green light:text-gray-500 dark:white hover:underline"
              :href="`${logo.logoImg}.png`"
              aria-label="Download png"
              download
              >PNG</ALink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const logosMd = ref()

    useFetch(async () => {
      logosMd.value = await $docus
        .search('/design-kit', { deep: true })
        .where({ slug: { $in: ['logos'] } })
        .fetch()
    })
    return {
      logosMd
    }
  }
})
</script>
