<template>
  <textarea v-model="value" class="w-full h-full" />
</template>

<script>
export default {
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
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)

        this.$api.put(`/pages${this.file.path}`, {
          data: value
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
textarea {
  @apply whitespace-nowrap overflow-scroll;
}
</style>
