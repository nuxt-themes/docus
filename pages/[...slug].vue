<script setup lang="ts">
import { computed, useDocus, useHead } from '#imports'

definePageMeta({
  /* Layout transitions creates layout shifts with defaults */
  layoutTransition: false,
  pageTransition: false,
})

const { page, theme } = useDocus()

// Page not found
if (!page.value) {
  throwError(
    createError({
      statusCode: 404,
      statusMessage: `Page not found: ${useRoute().path}`,
    }),
  )
}

const cover = computed(() => {
  const cover = page.value?.cover || theme.value?.cover
  if (typeof cover === 'string') {
    return { src: cover, alt: page.value?.title || theme.value.title }
  }
  return cover || {}
})

useHead({
  bodyAttrs: {
    class: [],
  },
  title: page.value?.title,
  titleTemplate: theme.value?.title ? `%s | ${theme.value.title}` : '%s',
  meta: [
    { hid: 'description', name: 'description', content: page.value?.description || theme.value?.description },
    { hid: 'og:site_name', property: 'og:site_name', content: theme.value?.title || '' },
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
      content: cover.value.src || '',
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: cover.value.src || '',
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: cover.value.alt || '',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: cover.value.src || '',
    },
  ],
})
</script>

<template>
  <NuxtLayout :name="page?.layout || 'default'">
    <ContentRenderer v-if="page" :key="page._id" class="docus-content" :value="page">
      <template #empty="{ value }">
        <Alert type="success">
          <div>
            <p>
              You have succesfully created the page: <span class="font-semibold">{{ value._path }}</span>
            </p>
          </div>
        </Alert>

        <Alert type="info">
          <div>
            <p>
              You can now start writing into: <span class="font-semibold">{{ value._source }}/{{ value._file }}</span>
            </p>
          </div>
        </Alert>
      </template>
    </ContentRenderer>
  </NuxtLayout>
</template>
