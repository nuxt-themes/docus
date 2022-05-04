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
        updateHeadings([...document.querySelectorAll('.docus-content h1'), ...document.querySelectorAll('.docus-content h2'), ...document.querySelectorAll('.docus-content h3'), ...document.querySelectorAll('.docus-content h4')])
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
  <div class="flex flex-col space-y-4">
    <NuxtLink v-if="prev" :to="prev.slug" class="text-primary group flex items-center gap-x-3 overflow-hidden font-semibold lg:flex-row-reverse">
      <div class="text-secondary-group-hover transition-base flex-shrink-0 rounded-lg">
        <Icon name="heroicons-solid:chevron-double-left" class="h-6 w-6" />
      </div>

      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>

    <template v-if="toc?.links?.length">
      <div class="flex items-center gap-x-3 overflow-hidden font-semibold lg:flex-row-reverse">
        <div class="flex-shrink-0 rounded-lg">
          <Icon name="heroicons-outline:view-grid" class="h-6 w-6" />
        </div>

        <span class="truncate">On this page</span>
      </div>

      <ul class="mr-[-1px] border-gray-500 pl-3 lg:pr-3">
        <li v-for="link in toc.links" :key="link.text" class="transition-base group min-w-0 border-l-2 transition-colors lg:border-r-2 lg:border-l-0 lg:text-right" :class="activeHeadings.includes(link.id) ? 'border-primary-600' : 'border-primary-300'">
          <a
            :href="`#${link.id}`"
            class="text-secondary-group-hover block truncate py-1 pl-3 lg:pr-3"
            :class="{
              'text-secondary-active': activeHeadings.includes(link.id),
              'text-secondary': !activeHeadings.includes(link.id),
            }"
            @click.prevent="scrollToHeading(link.id, '--docs-scroll-margin-block')"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </template>

    <NuxtLink v-if="next" :to="next.slug" class="text-primary group flex items-center gap-x-3 overflow-hidden font-semibold lg:flex-row-reverse">
      <div class="text-secondary-group-hover transition-base flex-shrink-0 rounded-lg">
        <Icon name="heroicons-solid:chevron-double-right" class="h-6 w-6" />
      </div>

      <span class="truncate">{{ next.title }}</span>
    </NuxtLink>
  </div>
</template>
