<script setup lang="ts">
import { useRepository } from '#imports'

const { last } = useRepository()
</script>

<template>
  <NuxtLink v-if="last" to="/releases" class="font-semibold transition-colors transition-base text-secondary hover:text-primary-hover" exact-active-class="text-primary-active">
    {{ last?.name }}
  </NuxtLink>
</template>
