<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium'
  },
  bold: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  transparent: {
    type: Boolean,
    default: false
  },
  blank: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <NuxtLink class="button-link" :class="[size, bold ? 'font-semibold' : 'font-medium']" :to="href" :target="blank ? '_blank' : undefined">
    <Icon v-if="icon" :name="icon" class="w-4 h-4 mr-2" />
    <ContentSlot :use="$slots.default" unwrap="p ul li" />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
a.button-link {
  @apply bg-primary-500 hover:bg-primary-600 focus:ring-primary-600 mb-2 inline-flex flex-none items-center rounded-lg border border-transparent px-3 py-1.5 text-sm leading-4 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900;

  &.medium {
    @apply px-4 py-2 text-base leading-4;
  }

  &.large {
    @apply px-6 py-2.5 text-lg leading-6;
  }

  &.transparent {
    @apply bg-transparent px-0 py-0;
  }
}
</style>
