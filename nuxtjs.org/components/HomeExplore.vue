<template>
  <section class="relative">
    <img
      loading="lazy"
      :src="`/img/home/explore/dark/landscape-explore.svg`"
      class="left-0 object-fill w-full h-40 dark-img"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/explore/light/landscape-explore.svg`"
      class="left-0 object-fill w-full h-40 light-img"
      alt="A landscape image"
    />
    <AContainer class="flex flex-col items-center py-20">
      <div class="flex flex-col items-center w-full col-span-12">
        <div class="mb-2">
          <CategoryLabel :label="category" />
        </div>
        <h2 class="mb-2 font-serif font-normal text-display-6 md:text-display-5 2xl:text-display-4">
          <Markdown use="title" unwrap="p" />
        </h2>
        <p class="mb-12 font-normal text-center text-body-base md:text-body-lg 2xl:text-body-xl">
          <Markdown use="description" unwrap="p" />
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-20 pb-8">
          <slot />
        </div>
      </div>
    </AContainer>
    <img
      loading="lazy"
      :src="`/img/home/campfire/dark/landscape-campfire.svg`"
      class="left-0 object-fill w-full h-40 light:hidden"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/campfire/light/landscape-campfire.svg`"
      class="left-0 object-fill w-full h-40 dark:hidden"
      alt="A landscape image"
    />
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    category: {
      type: String,
      default: 'Category'
    }
  }
})
</script>
