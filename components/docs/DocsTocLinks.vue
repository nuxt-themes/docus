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

watch(
  () => route.path,
  () => {
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
  },
  {
    immediate: true
  }
)

const scrollToHeading = (id: string) => {
  router.push(`#${id}`)
  emit('move', id)
}
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.text" class="min-w-0 group" :class="[{ 'pl-3': link.depth === 3, 'pl-6': link.depth === 4 }]">
      <a
        :href="`#${link.id}`"
        class="block py-1 text-sm truncate lg:pr-3"
        :class="[activeHeadings.includes(link.id) ? 'text-primary-500' : 'u-text-gray-500 hover:u-text-gray-900']"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>
      <DocsTocLinks v-if="link.children" :links="link.children" />
    </li>
  </ul>
</template>
