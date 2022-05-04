<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { theme } = useDocus()
const hasLogo = computed(() => theme.value?.header?.logo || false)
const hasTitle = computed(() => theme.value?.header?.title || false)
</script>

<template>
  <NuxtLink class="flex flex-none items-center lg:w-48" to="/" :aria-label="theme?.header?.title">
    <!-- Only title -->
    <span v-if="!hasLogo && hasTitle">
      {{ theme?.header?.title }}
    </span>

    <!-- Title and Logo -->
    <template v-else-if="hasLogo && hasTitle">
      <Logo class="h-6 w-auto sm:h-8" />

      <span>
        {{ theme?.header?.title || '' }}
      </span>
    </template>

    <!-- Only Logo -->
    <Logo v-else-if="hasLogo" class="h-6 w-auto sm:h-8" />

    <!-- Placeholder -->
    <template v-else>
      <Icon name="heroicons-outline:cloud" class="h-12 w-12" />
    </template>
  </NuxtLink>
</template>
