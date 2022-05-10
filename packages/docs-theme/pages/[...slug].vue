<script setup lang="ts">
import { useDocus, useHead } from '#imports'

definePageMeta({
  /* Layout transitions creates layout shifts with defaults */
  layoutTransition: false,
  middleware: ['navigation', 'github', 'page'],
})

const { page, theme } = useDocus()

useHead({
  bodyAttrs: {
    class: [],
  },
  title: page.value?.title,
  titleTemplate: theme.value?.title ? `%s | ${theme.value.title}` : '%s',
  description: page.value?.description || theme.value?.description || '',
  meta: [
    { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: theme.value?.url || theme.value?.socials?.twitter || '',
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: theme.value?.cover?.src || '',
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: theme.value?.cover?.src || '',
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: theme.value?.cover?.alt || '',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: theme.value?.cover?.src || '',
    },
  ],
})
</script>

<template>
  <Content v-if="page" class="docus-content" :document="page" />
</template>
