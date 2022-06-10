<script setup lang="ts">
defineProps({
  contributor: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div :id="contributor.login" class="flex items-center font-semibold">
    <img style="height: 32px; width: 32px" class="rounded-lg" :src="contributor.avatar_url" />
    <span class="ml-2">{{ contributor.login }}</span>
  </div>
</template>
