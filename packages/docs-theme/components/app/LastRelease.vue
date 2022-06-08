<script setup lang="ts">
import { useRepository } from '#imports'

const { last } = useRepository()
</script>

<template>
  <NuxtLink
    v-if="last"
    to="/releases"
    class="hover:text-primary-500 dark:hover:text-primary-500 font-medium text-gray-500 dark:text-gray-200"
    exact-active-class="text-primary-500"
  >
    {{ last?.name }}
  </NuxtLink>
</template>
