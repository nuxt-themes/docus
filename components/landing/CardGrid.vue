<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

defineProps({
  gap: {
    type: [String, Object],
    default: 'gap-4 2xl:gap-6'
  }
})
</script>

<template>
  <div
    class="card-grid"
    :class="[tokens.cardGrid.root]"
  >
    <ContentSlot :use="$slots.root" />

    <div
      class="card-grid-layout"
      :class="[gap, Object.values(tokens.cardGrid.layout)]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="ts">

</style>
