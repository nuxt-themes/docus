<template>
  <section class="relative pt-20 light:bg-gray-50 dark:bg-secondary-darkest">
    <AContainer class="flex flex-col items-center">
      <div class="flex flex-col w-full items-center col-span-12">
        <div class="mb-2">
          <CategoryLabel :label="category" />
        </div>
        <h2 class="font-normal font-serif text-display-6 md:text-display-5 2xl:text-display-4 mb-2">
          <Markdown slot="title" unwrap="p" />
        </h2>
        <p class="font-normal text-center text-body-base md:text-body-lg 2xl:text-body-xl mb-12">
          <Markdown slot="description" unwrap="p" />
        </p>

        <div class="w-full my-8">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-20 pb-8">
            <slot />
          </div>
        </div>
      </div>
    </AContainer>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    category: {
      type: String,
      default: 'Category'
    }
  }
})
</script>
