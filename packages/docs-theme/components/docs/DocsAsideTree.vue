<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useRoute } from '#imports'

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => [],
  },
  level: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: null,
  },
  parent: {
    type: Object as PropType<any>,
    default: null,
  },
})

const route = useRoute()

function isActive(link) {
  return link.exact ? route.path === link._path : route.path.startsWith(link._path)
}

const hasNesting = computed(() => props.links.some((link: any) => link.children))
</script>

<template>
  <ul>
    <li
      v-for="(link, index) in links"
      :key="link._path"
      :class="{
        'ml-2': parent?.icon,
        'pl-4': level > 0 && link.children,
        'border-l': level > 0 || !hasNesting,
        'border-primary-400 dark:border-primary-600': isActive(link),
        'border-gray-100 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-500': !isActive(link),
      }"
    >
      <div v-if="link.children" class="flex items-center justify-between pt-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
        <span class="inline-flex items-center">
          <Icon v-if="link.icon" :name="link.icon" class="mr-2 h-4 w-4" />
          <span>{{ link.title }}</span>
        </span>
      </div>
      <NuxtLink
        v-else
        :to="link._path"
        class="flex items-center justify-between py-1.5 text-sm"
        :exact="link.exact"
        :class="{
          'pl-4': level > 0 || !hasNesting,
          '!pt-0': level === 0 && index === 0,
          'text-primary font-medium': isActive(link),
          'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200': !isActive(link),
        }"
      >
        <span class="inline-flex items-center">
          <Icon v-if="link.icon" :name="link.icon" class="mr-1 h-4 w-4" />
          <span>{{ link.title }}</span>
        </span>
      </NuxtLink>

      <DocsAsideTree v-if="link.children?.length && (max === null || level + 1 < max)" :links="link.children" :level="level + 1" :parent="link" :max="max" class="py-2" />
    </li>
  </ul>
</template>
