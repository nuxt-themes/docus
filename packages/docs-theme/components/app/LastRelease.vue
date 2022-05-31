<script setup lang="ts">
import { useRepository } from '#imports'

const { last } = useRepository()
</script>

<template>
  <NuxtLink v-if="last" to="/releases" class="transition-base text-secondary hover:text-primary-hover font-semibold transition-colors" exact-active-class="text-primary-active">
    {{ last?.name }}
  </NuxtLink>
</template>
