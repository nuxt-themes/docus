<script setup lang="ts">
import { useRepository } from '#imports'

const { last } = useRepository()
</script>

<template>
  <NuxtLink v-if="last" to="/releases" class="text-secondary hover:text-primary-hover font-semibold" exact-active-class="text-primary-active">
    {{ last?.name }}
  </NuxtLink>
</template>
