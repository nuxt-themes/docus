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
    <NuxtLink v-if="prev" :to="prev.slug" class="flex items-center overflow-hidden font-semibold text-primary group gap-x-3 lg:flex-row-reverse">
      <div class="flex-shrink-0 rounded-lg text-secondary-group-hover transition-base">
        <Icon name="heroicons-solid:chevron-double-left" class="w-6 h-6" />
      </div>

      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>

    <template v-if="toc?.links?.length">
      <div class="flex items-center overflow-hidden font-semibold gap-x-3 lg:flex-row-reverse">
        <div class="flex-shrink-0 rounded-lg">
          <Icon name="heroicons-outline:view-grid" class="w-6 h-6" />
        </div>

        <span class="truncate">On this page</span>
      </div>

      <ul class="mr-[-1px] border-gray-500 pl-3 lg:pr-3">
        <li v-for="link in toc.links" :key="link.text" class="min-w-0 transition-colors border-l-2 transition-base group lg:border-r-2 lg:border-l-0 lg:text-right" :class="activeHeadings.includes(link.id) ? 'border-primary-400 dark:border-primary-600' : 'border-gray-200 dark:border-gray-700'">
          <a
            :href="`#${link.id}`"
            class="block py-1 pl-3 truncate text-secondary-group-hover lg:pr-3"
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

    <NuxtLink v-if="next" :to="next.slug" class="flex items-center overflow-hidden font-semibold text-primary group gap-x-3 lg:flex-row-reverse">
      <div class="flex-shrink-0 rounded-lg text-secondary-group-hover transition-base">
        <Icon name="heroicons-solid:chevron-double-right" class="w-6 h-6" />
      </div>

      <span class="truncate">{{ next.title }}</span>
    </NuxtLink>
  </div>
</template>
