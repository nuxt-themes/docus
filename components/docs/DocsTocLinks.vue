<script setup lang="ts">
import type { PropType } from 'vue'
import type { TocLink } from '@nuxt/content/dist/runtime/types'

defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => []
  }
})

const emit = defineEmits(['move'])

const route = useRoute()
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
</script>

<template>
  <ul class="docs-toc-links">
    <li v-for="link in links" :key="link.text" :class="[`depth-${link.depth}`]">
      <a
        :href="`#${link.id}`"
        :class="[activeHeadings.includes(link.id) && 'active']"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>
      <DocsTocLinks v-if="link.children" :links="link.children" />
    </li>
  </ul>
</template>

<style scoped lang="ts">
css({
  '.docs-toc-links': {
    '.depth-3': {
      paddingLeft: '{space.3}'
    },
    '.depth-4': {
      paddingLeft: '{space.6}'
    },
    a: {
      display: 'block',
      padding: '{space.1} 0',
      fontSize: '{text.sm.fontSize}',
      lineHeight: '{text.sm.lineHeight}',
      color: '{colors.gray.500}',
      // TODO: truncate
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '@mq.lg': {
        paddingRight: '{space.3}'
      },
      '&:not(.active):hover': {
        color: '{colors.gray.900}',
      },
      '@dark': {
        '&:not(.active):hover': {
          color: '{colors.gray.400}',
        },
      },
      '&.active': {
        color: '{colors.primary.500}'
      }
    }
  }
})
</style>
