<script setup lang="ts">
const docus = useDocus()
const logo = computed(() => docus.value.header?.logo || false)
const title = computed(() => docus.value.header?.title || docus.value.title)
</script>

<template>
  <NuxtLink class="navbar-logo" to="/" :aria-label="docus?.header?.title">
    <!-- Only Logo -->
    <!-- TODO: use component is -->
    <Logo v-if="logo" />
    <!-- Only title -->
    <span v-else>
      {{ title }}
    </span>
  </NuxtLink>
</template>

<style lang="ts" scoped>
css({
  a: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',

    span: {
      fontSize: '{fontSizes.xl}',
      fontWeight: '{fontWeights.bold}',
      color: '{colors.gray.900}',
      '@dark': {
        color: '{colors.gray.100}',
      },
      '&:hover': {
        color: '{colors.gray.500}',
      }
    }
  }
})
</style>
