<script setup lang="ts">
const docus = useDocus()
const logo = computed(() => docus.value.header?.logo || false)
const title = computed(() => docus.value.header?.title || docus.value.title)
</script>

<template>
  <NuxtLink class="flex items-center flex-none" to="/" :aria-label="docus?.header?.title">
    <!-- Only Logo -->
    <!-- TODO: use component is -->
    <Logo v-if="logo" />
    <!-- Only title -->
    <span v-else class="text-xl font-bold u-text-gray-900 hover:u-text-gray-500">
      {{ title }}
    </span>
  </NuxtLink>
</template>
