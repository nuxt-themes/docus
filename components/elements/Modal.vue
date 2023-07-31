<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import appConfig from '#build/app.config'

const { tokens } = appConfig

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  focusTrap: {
    type: Boolean,
    default: true,
  },
  transitionDuration: {
    type: Number,
    default: 200,
  },
  scrimBackgroundColor: {
    type: String,
    default: appConfig.tokens.modal.scrim.backgroundColor,
  },
})

defineEmits(['update:modelValue'])

const modalRef = ref<HTMLElement | null>(null)

const { activate, deactivate } = useFocusTrap(modalRef)

const { lock, unlock } = useBodyLock()

watch(() => props.modelValue, (value) => {
  if (value) {
    lock()
    if (props.focusTrap) {
      setTimeout(() => {
        activate()
      })
    }
  } else {
    unlock()
    if (props.focusTrap) {
      deactivate()
    }
  }
})
</script>

<template>
  <teleport to="body">
    <transition
      name="modal"
      :duration="transitionDuration"
    >
      <div
        v-if="modelValue"
        ref="modalRef"
        class="modal-wrapper fixed inset-0 flex items-start overflow-y-auto"
        :class="[Object.values(tokens.modal.root)]"
        tabindex="0"
        @click="$emit('update:modelValue')"
      >
        <div class="scrim fixed inset-0 -z-[1] pointer-events-none" :class="[scrimBackgroundColor, tokens.modal.scrim.backdropFilter]"/>
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce)  {
  .scrim {
    transition: all 0ms !important;
  }
}
.modal-enter-active .scrim,
.modal-leave-active .scrim {
  transition: opacity 100ms linear;
}
.modal-enter-from .scrim,
.modal-leave-to .scrim {
  opacity: 0;
}
</style>
