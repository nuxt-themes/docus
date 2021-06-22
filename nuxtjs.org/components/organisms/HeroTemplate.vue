<template>
  <div class="relative">
    <div>
      <slot name="illustration" />
      <div class="flex flex-wrap justify-center py-0 section" :class="{ 'lg:justify-between': !contentCenter }">
        <section
          class="flex flex-col justify-start w-full px-4 pt-36 pb-52 md:pt-44 lg:pb-56 lg:pt-52 text-center"
          :class="{ 'lg:text-left xl:w-1/2': !contentCenter }"
        >
          <Markdown use="title" unwrap="p" />
          <Markdown use="description" />
          <div
            v-if="$slots.buttons"
            class="flex flex-wrap justify-center space-x-3 xl:space-x-4"
            :class="{ 'lg:justify-start': !contentCenter }"
          >
            <slot name="buttons" />
          </div>
        </section>
      </div>
      <!-- Footer background -->
      <slot name="footer-illustration" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    contentCenter: {
      type: Boolean,
      default: false
    }
  }
})
</script>
