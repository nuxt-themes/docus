<template>
  <section class="relative pt-20">
    <NuxtContainer class="flex flex-col items-center">
      <div class="flex flex-col w-full items-center col-span-12">
        <div class="mb-2">
          <span class="text-tertiary font-bold text-lg">{{ category }}</span>
        </div>
        <h2 class="font-normal font-serif text-display-6 md:text-display-5 2xl:text-display-4 mb-2">
          <Markdown use="title" unwrap="p" />
        </h2>
        <p class="font-normal text-center text-body-base md:text-body-lg 2xl:text-body-xl mb-8">
          <Markdown use="description" unwrap="p" />
        </p>
        <MPartnersBanner class="pb-0" :partners-logo="partners" />
        <p><Markdown use="bottom" unwrap="p" /></p>
      </div>
    </NuxtContainer>
    <img
      loading="lazy"
      :src="`/img/home/discover/partners/dark/landscape-discover-partners.svg`"
      class="w-full h-40 object-fill left-0 mt-10 -mb-2 light:hidden"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/discover/partners/light/landscape-discover-partners.svg`"
      class="w-full h-40 object-fill left-0 mt-10 -mb-2 dark:hidden"
      alt="A landscape image"
    />
  </section>
</template>

<script>
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    category: {
      type: String,
      default: 'Category'
    }
  },
  setup() {
    const { $docus } = useContext()
    const partners = ref()

    useFetch(async () => {
      partners.value = await $docus
        .search('/sponsors', { deep: true })
        .where({ tier: { $in: ['MVP Partners', 'Partners'] } })
        .fetch()
    })

    return {
      partners
    }
  }
})
</script>
