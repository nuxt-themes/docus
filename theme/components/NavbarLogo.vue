<script setup lang="ts">
const theme = useTheme()
const hasLogo = computed(() => theme.value.header?.logo || false)
const hasTitle = computed(() => theme.value.header?.title || false)
</script>

<template>
  <NuxtLink class="flex items-center flex-none" to="/" :aria-label="theme?.header?.title">
    <!-- Only title -->
    <span v-if="!hasLogo && hasTitle" class="text-xl font-bold u-text-gray-900 hover:u-text-gray-500">
      {{ theme?.header?.title }}
    </span>

    <!-- Title and Logo -->
    <template v-else-if="hasLogo && hasTitle">
      <Logo />

      <span class="text-xl font-bold u-text-gray-900 hover:u-text-gray-500">
        {{ theme?.header?.title || '' }}
      </span>
    </template>

    <!-- Only Logo -->
    <Logo v-else-if="hasLogo" />

    <!-- Placeholder -->
    <template v-else>
      <Icon name="heroicons-outline:cloud" class="w-12 h-12" />
    </template>
  </NuxtLink>
</template>
