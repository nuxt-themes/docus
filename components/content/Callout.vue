<script setup lang="ts">
const props = defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator (value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary'].includes(value)
    }
  },
  modelValue: {
    required: false,
    default: ref(false)
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
}
</script>

<template>
  <div class="callout" :class="[type]">
    <span class="preview" @click="toggle">
      <ContentSlot :use="$slots.summary" />
      <Icon
        name="heroicons-outline:chevron-right"
        class="w-5 h-5 transition-transform transform"
        :class="{
          'rotate-90': isOpen,
        }"
      />
    </span>

    <div v-show="isOpen" class="content">
      <ContentSlot :use="$slots.content" />
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.callout': {
    position: 'relative',
    px: '{space.4}',
    my: '{space.4}',
    fontSize: '{text.sm.fontSize}',
    lineHeight: '{text.sm.lineHeight}',
    borderRadius: '{radii.xl}',
    '.preview': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    '.content': {
      marginTop: 'calc(0px - {space.4})'
    }
  }
})
</style>
