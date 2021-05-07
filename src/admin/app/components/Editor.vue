<template>
  <textarea v-model="value" class="w-full h-full" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue3'
import { useApi } from '../plugins/api'

export default defineComponent({
  props: {
    file: {
      type: Object,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const api = useApi()

    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)

        api.put(`/pages${props.file.path}`, {
          data: value
        })
      }
    })

    return { value }
  }
})
</script>

<style lang="postcss" scoped>
textarea {
  @apply whitespace-nowrap overflow-scroll;
}
</style>
