<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <Modal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue')"
  >
    <div
      class="drawer-content"
      :class="Object.values(tokens.drawer)"
    >
      <slot />
    </div>
  </Modal>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce)  {
  .drawer-content {
    transition: all 0ms !important;
  }
}
.modal-enter-active .drawer-content,
.modal-leave-active .drawer-content {
  transition: transform 200ms theme('transitionTimingFunction.out-back'), opacity 200ms theme('transitionTimingFunction.out-back');
}
.modal-enter-from .drawer-content,
.modal-leave-to .drawer-content {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
</style>
