<script lang="ts">
import { joinURL } from 'ufo'
import { computed, defineComponent, useDocus } from '#imports'

export default defineComponent({
  setup() {
    const { page, theme } = useDocus()

    const contentDir = 'content'

    const repoUrl = computed(() => joinURL('https://github.com', theme.value?.github?.repository || ''))

    const link = computed(() => {
      if (!theme.value?.github || !page.value || !page.value?.id) return

      const key = page.value.id.split(':')
      const dir = key[key.length - 2]
      const source = key[key.length - 1]

      return [repoUrl.value, 'edit', theme.value?.github?.branch || 'main', theme.value?.github?.dir || '', contentDir, dir, `${source}`.replace(/^\//g, '')].filter(Boolean).join('/')
    })

    return {
      page,
      link,
    }
  },
})
</script>

<template>
  <div v-if="link" class="text-secondary mt-8 mb-4 flex flex-row justify-between text-sm">
    <a :href="link" target="_blank" rel="noopener" class="hover:text-secondary-hover transition-base flex items-center transition-colors">
      <Icon name="heroicons-outline:pencil-alt" class="mr-1 h-6 w-6" />
      <span>Edit on GitHub</span>
    </a>

    <span v-if="page.mtime" class="flex items-center">Updated on: {{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</span>
  </div>
</template>
