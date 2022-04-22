<script setup lang="ts">
const router = useRouter()

const { page, fetchPage } = useContent()

await fetchPage()

if (page.value && page.value.layout)
  router.currentRoute.value.meta.layout = page.value.layout
else
  router.currentRoute.value.meta.layout = 'default'
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
