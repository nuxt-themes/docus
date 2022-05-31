<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: '',
  },
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'base',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary', 'base'].includes(value)
    },
  },
  blurry: {
    type: Boolean,
    default: true,
    required: false,
  },
})
</script>

<template>
  <div class="flex">
    <div :class="[type, { blurry }]" class="relative w-full p-8 card rounded-xl">
      <Icon v-if="icon" :name="icon" class="inline-block w-8 h-8 mb-2 text-2xl" />

      <Markdown :use="$slots.default" />

      <div>
        <h3 v-if="title || $slots.title" class="mb-2 text-lg font-semibold tracking-tight">
          {{ title }}
          <Markdown :use="$slots.title" unwrap="p" />
        </h3>

        <p v-if="description || $slots.description" class="inline text-sm font-medium tracking-tight text-secondary">
          {{ description }}
          <Markdown :use="$slots.description" unwrap="p" />
        </p>
      </div>
    </div>
  </div>
</template>
