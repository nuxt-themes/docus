<template>
  <div class="py-4 d-container-content">
    <div class="flex flex-col light:text-secondary-dark dark:text-white pt-8 pb-24 space-y-4">
      <h2 class="font-semibold text-display-6 text-center">
        <Markdown use="titleSection" unwrap="p" />
      </h2>

      <div class="text-lg w-full flex justify-center">
        <p class="text-center md:w-2/3">
          <Markdown use="descriptionSection" unwrap="p" />
        </p>
      </div>
    </div>

    <div v-for="(sponsors, index) in sustainability" :key="index" class="flex flex-col items-center">
      <h2 class="text-display-6 font-semibold">{{ sponsors.tier }}</h2>
      <div class="flex flex-wrap justify-center -mx-8 pt-8 pb-24">
        <NuxtHref
          v-for="logo in sponsors.logos"
          :key="logo.title"
          :href="logo.url"
          :aria-label="logo.title"
          class="mx-8 my-4"
        >
          <img :src="`/img/sponsors/${$colorMode.value}/${logo.img}.png`" :alt="logo.title" :class="logo.size" />
        </NuxtHref>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const sustainability = ref()
    useFetch(async () => {
      sustainability.value = await $docus.search('/sustainability', { deep: true }).sortBy('position', 'asc').fetch()
      sustainability.value = sustainability.value.filter(sustainability => sustainability.tier)
    })

    return {
      sustainability
    }
  }
})
</script>
