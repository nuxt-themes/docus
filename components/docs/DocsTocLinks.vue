<script setup lang="ts">
import type { PropType } from 'vue'
import type { TocLink } from '@nuxt/content/dist/runtime/types'
import { useRoute, useRouter, useScrollspy, watch } from '#imports'

defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => [],
  },
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
          ...document.querySelectorAll('.docus-content h1'),
          ...document.querySelectorAll('.docus-content h2'),
          ...document.querySelectorAll('.docus-content h3'),
          ...document.querySelectorAll('.docus-content h4'),
        ])
      }, 300)
    }
  },
  {
    immediate: true,
  },
)

const scrollToHeading = (id: string) => {
  router.push(`#${id}`)
  emit('move', id)
}
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.text" class="group min-w-0" :class="[{ 'pl-3': link.depth === 3, 'pl-6': link.depth === 4 }]">
      <a
        :href="`#${link.id}`"
        class="block truncate py-1 text-sm lg:pr-3"
        :class="[activeHeadings.includes(link.id) ? 'text-primary-500' : 'u-text-gray-500 group-hover:u-text-gray-900']"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>
      <DocsTocLinks v-if="link.children" :links="link.children" />
    </li>
  </ul>
</template>
