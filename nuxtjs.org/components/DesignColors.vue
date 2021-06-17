<template>
  <div>
    <div v-for="content in colorsMd" :key="content.slug" class="grid grid-cols-2 py-4 gap-6">
      <div v-for="color in content.colors" :key="color.slug">
        <div class="w-full h-32 rounded-lg" :class="color.bg_color" />
        <div class="font-semibold pt-4">{{ color.name }}</div>
        <div>{{ color.hexa }}</div>
        <div>{{ `RGB: ${color.rgb}` }}</div>
      </div>
    </div>
    <div class="mt-4">
      <ALink
        href="/design-kit/DesignKitColors.fig"
        aria-label="Dowload Color System"
        class="rounded bg-primary-green text-gray-800 hover:bg-green-300 focus:bg-green-300 py-3 px-4"
        download
        ><span class="font-medium">Download Color System</span></ALink
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const colorsMd = ref()

    useFetch(async () => {
      colorsMd.value = await $docus
        .search('/design-kit', { deep: true })
        .where({ slug: { $in: ['colors'] } })
        .fetch()
    })

    return {
      colorsMd
    }
  }
})
</script>
