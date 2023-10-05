<script setup lang="ts">
defineProps({
  blank: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    :target="blank ? '_blank' : undefined"
    class="announce inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-primary-static text-sm font-medium shadow-light-up"
  >
    <span class="announce-content px-3">
      <ContentSlot
        :use="$slots.default"
        unwrap="p"
      />
    </span>
    <span class="announce-icon flex py-1 px-2 rounded-full bg-gray-200 dark:bg-gray-700">
      <Icon name="ic:round-arrow-forward" />
    </span>
  </component>
</template>
