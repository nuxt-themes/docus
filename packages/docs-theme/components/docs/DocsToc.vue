<script setup lang="ts">
import { useDocus, useRoute, useScrollToHeading, useScrollspy, watch } from '#imports'

const emit = defineEmits(['move'])

const route = useRoute()

const { activeHeadings, updateHeadings } = useScrollspy()

const { toc, prev, next } = useDocus()

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

function scrollToHeading(id: string, scrollMarginCssVar: string) {
  useScrollToHeading(id, scrollMarginCssVar)
  emit('move', id)
}
</script>

<template>
  <div class="flex flex-col space-y-1 sm:space-y-2">
    <template v-if="toc?.links?.length">
      <div class="items-center hidden overflow-hidden font-semibold lg:flex">
        <span>Table of Contents</span>
      </div>
      <ul class="pl-3">
        <li
          v-for="link in toc.links"
          :key="link.text"
          class="min-w-0 transition-colors transition-base group"
          :class="activeHeadings.includes(link.id) ? 'font-medium' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:dark:border-gray-600'"
        >
          <a
            :href="`#${link.id}`"
            class="block py-1 text-sm truncate lg:pr-3"
            :class="[
              activeHeadings.includes(link.id) ?
                'text-gray-900 dark:text-gray-200' :
                'text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-200',
            ]"
            @click.prevent="scrollToHeading(link.id, '--docs-scroll-margin-block')"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>
