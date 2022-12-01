<script setup lang="ts">
const docus = useDocus()
const logo = computed(() => docus.value.header?.logo || false)
const title = computed(() => docus.value.header?.title || docus.value.title)
</script>

<template>
  <NuxtLink class="navbar-logo" to="/" :aria-label="docus?.header?.title">
    <!-- Only Logo -->
    <component :is="logo" v-if="logo && typeof logo === 'string'" />
    <Logo v-else-if="logo" />

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
      fontSize: '{fontSize.xl}',
      fontWeight: '{fontWeight.bold}',
      color: '{color.gray.900}',
      '@dark': {
        color: '{color.gray.100}',
      },
      '&:hover': {
        color: '{color.gray.500}',
      }
    }
  }
})
</style>
