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
    <div :class="[type, { blurry }]" class="card relative w-full rounded-xl p-8">
      <Icon v-if="icon" :name="icon" class="mb-2 inline-block h-8 w-8 text-2xl" />
      <slot />
      <div>
        <h3 v-if="title || $slots.title" class="mb-2 text-lg font-semibold tracking-tight">
          {{ title }}
          <Markdown :use="$slots.title" unwrap="p" />
        </h3>
        <div>
          <slot name="description">
            <p v-if="description" class="inline text-sm font-medium tracking-tight">
              {{ description }}
            </p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
