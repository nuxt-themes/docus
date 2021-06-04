<template>
  <section class="relative">
    <!-- Background -->
    <slot name="background-illustration" />

    <!-- Header illustration -->
    <slot name="header-illustration" />

    <AContainer class="flex flex-col items-center">
      <!-- Title -->
      <slot name="main-title" />

      <!-- Description -->
      <slot name="main-description" />

      <!-- Content -->
      <div class="flex flex-col w-full md:grid md:grid-cols-12">
        <slot name="left-illustration" />
        <slot name="section-content" />
        <slot name="right-illustration" />
      </div>

      <!-- Call to action -->
      <slot name="link" />
    </AContainer>

    <!-- Footer background -->
    <slot name="footer-illustration" />
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    height: {
      type: String,
      default: '70vh'
    },
    minHeight: {
      type: String,
      default: '560px'
    }
  }
})
</script>
