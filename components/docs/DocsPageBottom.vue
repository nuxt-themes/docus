<script setup lang="ts">
const config = useRuntimeConfig()
const { page } = useContent()
const docus = useDocus()
</script>

<template>
  <div v-if="page" class="flex flex-col-reverse justify-between gap-4 mt-8 text-sm u-text-gray-500 md:flex-row">
    <div class="flex flex-col flex-1 w-full gap-4 md:w-1/2">
      <PageEditLink v-if="config?.github && docus?.github?.edit" />
      <span v-if="page.mtime" class="flex items-center">Updated on: {{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</span>
    </div>

    <div class="flex-1 w-full md:w-1/2">
      <PageContributors v-if="config?.github && docus?.github?.contributors" />
    </div>
  </div>
</template>
