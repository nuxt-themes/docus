<script setup lang="ts">
import { useRepository } from '#imports'

defineProps({
  to: {
    type: String,
    default: '/releases',
  },
})

const { last } = useRepository()
</script>

<template>
  <NuxtLink v-if="last" :to="to" class="hover:text-primary-500 u-text-gray-500 font-medium" exact-active-class="text-primary-500">
    {{ last?.name }}
  </NuxtLink>
</template>
