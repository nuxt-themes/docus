<script setup lang="ts">
const { page } = useDocus()

definePageMeta({
  middleware: ['page'],
})
</script>

<template>
  <Content v-if="page" class="content" :document="page" />
</template>

<style scoped>
.content {
  & > :first-child {
    margin-top: 0 !important;
  }
}
</style>
