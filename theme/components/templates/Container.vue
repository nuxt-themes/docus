<template>
  <div class="w-full mx-auto">
    <slot v-if="header" name="header"><Header :aside="aside" /></slot>
    <div class="mx-auto max-w-8xl lg:flex">
      <slot v-if="aside" name="aside"><Aside /></slot>
      <div class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
        <slot />
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Boolean,
      default: true
    },
    aside: {
      type: Boolean,
      default: false
    }
  }
}
</script>
