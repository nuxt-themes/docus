<script setup lang="ts">
const theme = useTheme()
const hasLogo = computed(() => theme.header.logo)
const hasTitle = computed(() => theme.header.title)
</script>

<template>
  <NuxtLink to="/" :aria-label="theme.header.title">
    <!-- Only title -->
    <span v-if="!hasLogo && hasTitle">
      {{ theme.header.title }}
    </span>

    <!-- Title and Logo -->
    <template v-else-if="hasLogo && hasTitle">
      <Logo />

      <span>
        {{ theme.header.title }}
      </span>
    </template>

    <!-- Only Logo -->
    <Logo v-else-if="hasLogo" class="w-12 h-12" />

    <!-- Placeholder -->
    <template v-else>
      <IconDots class="w-12 h-12" />
    </template>
  </NuxtLink>
</template>
