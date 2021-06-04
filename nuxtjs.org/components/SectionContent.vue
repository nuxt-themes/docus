<template>
  <div
    class="flex flex-col w-full space-y-4"
    :class="{
      'items-start': position === 'left',
      'items-center text-center': position === 'center',
      'items-end': position === 'right'
    }"
  >
    <slot name="icon" />
    <slot name="category" />
    <slot name="title" />
    <slot name="paragraph" />
    <slot name="content" />
    <slot name="link" />
    <slot name="banner" />
    <slot name="button" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    position: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'center', 'right'].includes(value)
      }
    }
  }
})
</script>
