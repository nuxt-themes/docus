<script setup lang="ts">
import { joinURL } from 'ufo'
import { computed, useDocus, useRuntimeConfig } from '#imports'

const props = defineProps({
  repository: {
    type: [String, Boolean],
    default: false,
  },
  contentDir: {
    type: [String, Boolean],
    default: 'content',
  },
  dir: {
    type: [String, Boolean],
    default: false,
  },
  branch: {
    type: [String, Boolean],
    default: false,
  },
  source: {
    type: [String, Boolean],
    default: false,
  },
  usePage: {
    type: Boolean,
    default: true,
  },
})

const config = useRuntimeConfig().github

const { page, theme } = useDocus()

const { owner, repo, branch } = config

if (!owner || !repo || !branch) {
  console.warn('If you want to use `EditOnGithub` component, you must specify: `owner`, `repo` and `branch` in your nuxt.config `github` key.')
}

const url = computed(() => joinURL('https://github.com', `${owner}/${repo}`))

const path = computed(() => {
  const dirParts = []

  // Use page path
  if (props.usePage && page.value) {
    // Use theme root dir
    if (theme.value?.github?.dir) dirParts.push(theme.value.github.dir)
    // Use content dir
    if (props.contentDir) dirParts.push(props.contentDir)
    // Get page file from page data
    dirParts.push(`${page.value.path}.${page.value.extension}`)
    return dirParts
  }

  // Use theme root dir
  if (theme.value?.github?.dir) {
    dirParts.push(theme.value.github.dir)
  }

  // Use props dir
  if (props.dir) {
    dirParts.push(props.dir)
  }

  // Use props source
  if (props.source) {
    dirParts.push(props.source)
  }

  return dirParts
})

const link = computed(() => {
  if (!url.value) return

  const parts = [url.value, 'edit', branch.value, ...path.value]

  return parts.filter(Boolean).join('/')
})
</script>

<template>
  <a :href="link" target="_blank" rel="noopener" class="flex items-center transition-colors hover:text-primary-hover transition-base">
    <Icon name="heroicons-outline:pencil-alt" class="w-6 h-6 mr-1" />
    <span>Edit on GitHub</span>
  </a>
</template>
