<template>
  <div class="code-block" :class="[active && 'active']">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Label to display for the tab
     */
    label: {
      type: String,
      required: true
    },
    /**
     * Select which tab should be active
     */
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.code-block {
  display: none;
}
.code-block.active {
  display: block;
}
</style>
