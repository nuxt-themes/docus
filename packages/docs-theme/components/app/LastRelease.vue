<script setup lang="ts">
import { useReleases } from '#imports'

const { last } = useReleases()
</script>

<template>
  <NuxtLink to="/releases" class="transition-base text-secondary hover:text-secondary-hover font-semibold transition-colors" exact-active-class="text-secondary-active">
    <Badge type="primary">
      {{ last?.name }}
    </Badge>
  </NuxtLink>
</template>
