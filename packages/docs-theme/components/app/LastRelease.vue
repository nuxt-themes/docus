<script setup lang="ts">
import { useRepository } from '#imports'

const { last } = useRepository()
</script>

<template>
  <NuxtLink v-if="last" to="/releases" class="transition-base text-secondary hover:text-secondary-hover font-semibold transition-colors" exact-active-class="text-secondary-active">
    {{ last?.name }}
  </NuxtLink>
</template>
