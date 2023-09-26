<script setup lang="ts">
import type { PropType } from 'vue'
import type { TocLink } from '@nuxt/content/dist/runtime/types'
import appConfig from '#build/app.config'

const { tokens } = appConfig

defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => []
  }
})

const emit = defineEmits(['move'])

const router = useRouter()

const { activeHeadings, updateHeadings } = useScrollspy()

if (process.client) {
  setTimeout(() => {
    updateHeadings([
      ...document.querySelectorAll('.document-driven-page h1, .docus-content h1'),
      ...document.querySelectorAll('.document-driven-page h2, .docus-content h2'),
      ...document.querySelectorAll('.document-driven-page h3, .docus-content h3'),
      ...document.querySelectorAll('.document-driven-page h4, .docus-content h4')
    ])
  }, 300)
}

function scrollToHeading (id: string) {
  router.push(`#${id}`)
  emit('move', id)
}

function childMove (id: string) {
  emit('move', id)
}
</script>

<template>
  <ul class="docs-toc-links">
    <li
      v-for="link in links"
      :key="link.text"
      :class="[link.depth === 3 && 'ps-3', link.depth === 4 && 'ps-6']"
    >
      <a
        :href="`#${link.id}`"
        :class="[activeHeadings.includes(link.id) && 'active', tokens.docsTocLinks.link]"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>
      <DocsTocLinks
        v-if="link.children"
        :links="link.children"
        @move="childMove($event)"
      />
    </li>
  </ul>
</template>
