<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme } = useDocus()
const hasLogo = computed(() => theme.value?.header?.logo || false)
const hasTitle = computed(() => theme.value?.header?.title || false)
</script>

<template>
  <NuxtLink class="flex items-center flex-none" to="/" :aria-label="theme?.header?.title">
    <!-- Only title -->
    <span v-if="!hasLogo && hasTitle">
      {{ theme?.header?.title }}
    </span>

    <!-- Title and Logo -->
    <template v-else-if="hasLogo && hasTitle">
      <Logo />

      <span>
        {{ theme?.header?.title || '' }}
      </span>
    </template>

    <!-- Only Logo -->
    <Logo v-else-if="hasLogo" class="w-auto h-6 sm:h-8" />

    <!-- Placeholder -->
    <template v-else>
      <Icon name="heroicons-outline:cloud" class="w-12 h-12" />
    </template>
  </NuxtLink>
</template>
