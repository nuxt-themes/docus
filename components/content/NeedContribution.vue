<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
    default: '/community/contribution#documentation-guide',
  },
  icon: {
    type: String,
    required: true,
    default: '🚧',
  },
})
</script>

<template>
  <Alert type="warning" :icon="icon">
    Documentation for this section is not yet complete. You can
    <NuxtLink :to="to">
      contribute to the documentation.
    </NuxtLink>
  </Alert>
</template>
