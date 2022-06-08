<script setup lang="ts">
import { useDocus, useRoute, useRouter, useScrollspy, watch } from '#imports'

const emit = defineEmits(['move'])

const route = useRoute()
const router = useRouter()

const { activeHeadings, updateHeadings } = useScrollspy()

const { toc } = useDocus()

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
      }, 100)
    }
  },
  {
    immediate: true,
  },
)

function scrollToHeading(id: string) {
  router.push(`#${id}`)
  emit('move', id)
}
</script>

<template>
  <div class="flex flex-col space-y-1 sm:space-y-2">
    <template v-if="toc?.links?.length">
      <div class="hidden items-center overflow-hidden text-sm font-semibold lg:flex">
        <span>Table of Contents</span>
      </div>

      <ul>
        <li v-for="link in toc.links" :key="link.text" class="group min-w-0" :class="[{ 'pl-3': link.depth === 3, 'pl-6': link.depth === 4 }]">
          <a
            :href="`#${link.id}`"
            class="block truncate py-1 text-sm lg:pr-3"
            :class="[activeHeadings.includes(link.id) ? 'text-primary-500' : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-200']"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>
