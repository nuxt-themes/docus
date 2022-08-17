<script setup lang="ts">
import { ref } from '#imports'

const props = defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary'].includes(value)
    },
  },
  modelValue: {
    required: false,
    default: ref(false),
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
}
</script>

<template>
  <div class="callout relative mt-4 mb-4 rounded-xl px-4 text-sm leading-relaxed" :class="[type]">
    <span class="flex items-center justify-between" @click="toggle">
      <ContentSlot :use="$slots.summary" />
      <Icon
        name="heroicons-outline:chevron-right"
        class="h-5 w-5 transform transition-transform"
        :class="{
          'rotate-90': isOpen,
        }"
      />
    </span>

    <div v-show="isOpen" class="-mt-4">
      <ContentSlot :use="$slots.content" />
    </div>
  </div>
</template>
