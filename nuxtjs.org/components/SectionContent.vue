<template>
  <div
    class="flex flex-col w-full"
    :class="{
      'items-start': position === 'left',
      'items-center text-center': position === 'center',
      'items-end': position === 'right'
    }"
  >
    <slot name="icon" />
    <div v-if="$scopedSlots.category" class="mb-2">
      <slot name="category" />
    </div>
    <div v-if="$scopedSlots.title" class="mb-1">
      <slot name="title" />
    </div>
    <div v-if="$scopedSlots.paragraph" class="mb-16">
      <slot name="paragraph" />
    </div>
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
