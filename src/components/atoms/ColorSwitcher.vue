<template>
  <button
    slot="placeholder"
    class="d-icon"
    aria-label="Color Mode"
    :class="[padding]"
    @click="$colorMode.value === 'dark' ? ($colorMode.preference = 'light') : ($colorMode.preference = 'dark')"
  >
    <ClientOnly>
      <IconSun v-if="$colorMode.value === 'light'" :class="size" />
      <IconMoon v-else :class="size" />
      <template #placeholder>...</template>
    </ClientOnly>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'w-6 h-6'
    },
    padding: {
      type: String,
      default: 'p-0'
    }
  }
}
</script>
