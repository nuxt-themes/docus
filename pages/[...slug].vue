<script setup lang="ts">
definePageMeta({
  middleware: [
    'page',
    /* 'components' */
  ],
})

const { page } = useDocus()
</script>

<template>
  <Content v-if="page" class="content" :document="page" />
  <p v-else>
    Page not found
  </p>
</template>

<style scoped>
.content {
  & > :first-child {
    margin-top: 0 !important;
  }
}
</style>
