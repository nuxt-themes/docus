<script lang="ts">
import { defineComponent, useDocus } from '#imports'

export default defineComponent({
  setup() {
    const { page, theme } = useDocus()

    return {
      page,
      theme,
    }
  },
})
</script>

<template>
  <div v-if="page && theme?.github" class="text-secondary mt-8 flex flex-row justify-between text-sm">
    <EditOnGithub />

    <span v-if="page.mtime" class="flex items-center">Updated on: {{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</span>
  </div>
</template>
