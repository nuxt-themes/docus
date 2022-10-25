<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  },
  iconClass: {
    type: String,
    default: ''
  },
  blurry: {
    type: Boolean,
    default: true,
    required: false
  }
})
</script>

<template>
  <div class="flex">
    <div :class="{ blurry }" class="relative w-full p-8 card rounded-xl">
      <Icon v-if="icon" :name="icon" class="inline-block w-8 h-8 mb-2 text-2xl" />
      <slot />
      <div>
        <h3 class="mb-2 text-lg font-semibold tracking-tight">
          <ContentSlot :use="$slots.title" unwrap="p">
            Card title
          </ContentSlot>
        </h3>
        <p class="inline text-sm font-medium tracking-tight">
          <ContentSlot :use="$slots.description" unwrap="p">
            Card description
          </ContentSlot>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.card {
  @apply border border-gray-200 bg-gray-50 dark:border-gray-900 dark:bg-gray-800 dark:bg-opacity-25 dark:text-gray-50;
  &.blurry {
    @apply !backdrop-blur-lg !bg-opacity-20 backdrop-saturate-150;
  }

  :deep(code) {
    @apply text-current bg-gray-100 border-gray-200 shadow-none dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-50;
  }

  :deep(a) {
    @apply text-current border-none font-semibold underline;
    &:hover {
      @apply dark:text-white text-black;
      code {
        @apply border-gray-400 dark:border-gray-700;
      }
    }
  }

  :deep(strong) {
    @apply !font-bold !text-current;
  }

  :deep(li::before) {
    @apply !text-current !bg-current;
  }

  :deep(.prose-code) {
    @apply my-4;

    code {
      @apply !bg-transparent;
    }
  }
}
</style>
