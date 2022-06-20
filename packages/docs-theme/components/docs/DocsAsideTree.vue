<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, reactive, useDocus, useRoute } from '#imports'

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

const { theme } = useDocus()

const collapsedMap = useState('docus-docs-aside-collapse-map', () => ({}))

const route = useRoute()

const isActive = (link) => {
  return link.exact ? route.path === link._path : route.path.startsWith(link._path)
}

const isCollapsed = (link) => {
  if (link.children) {
    // If directory is active force uncollapse mode
    if (isActive(link)) return false

    // Directory has been toggled manually, use its state
    if (typeof collapsedMap.value[link._path] !== 'undefined') {
      return collapsedMap.value[link._path]
    }

    // Return value grabbed from the link
    if (link?.collapsed) return link?.collapsed

    if (theme.value?.aside?.collapsed) return theme.value?.aside?.collapsed
  }

  return false
}

const toggleCollapse = (link) => {
  // Avoid collapsing active section
  if (isActive(link)) return

  collapsedMap.value[link._path] = !isCollapsed(link)
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
        'pl-4 pr-4': level > 0 && link.children,
        'border-l': level > 0 || !hasNesting,
        'border-primary-400 dark:border-primary-600': isActive(link),
        'u-border-gray-100 hover:u-border-gray-300': !isActive(link),
      }"
    >
      <button
        v-if="link.children"
        :disabled="isActive(link)"
        class="u-text-gray-900 flex items-center justify-between w-full py-1.5 text-sm font-semibold cursor-pointer group"
        @click="toggleCollapse(link, index)"
      >
        <span class="flex items-center">
          <Icon v-if="link.icon" :name="link.icon" class="mr-2 h-4 w-4" />
          <span>{{ link.title }}</span>
        </span>
        <span class="flex">
          <Icon v-if="isCollapsed(link)" name="heroicons-outline:plus" class="h-4 w-4 group-hover:text-primary-500" />
          <Icon v-else name="heroicons-outline:minus" class="h-4 w-4 group-hover:text-primary-500" />
        </span>
      </button>

      <NuxtLink
        v-else
        :to="link._path"
        class="flex items-center justify-between py-1.5 text-sm"
        :exact="link.exact"
        :class="{
          'pl-4': level > 0 || !hasNesting,
          'text-primary-500 font-medium': isActive(link),
          'u-text-gray-500 hover:u-text-gray-900': !isActive(link),
        }"
      >
        <span class="inline-flex items-center">
          <Icon v-if="link.icon" :name="link.icon" class="mr-1 h-4 w-4" />
          <span>{{ link.title }}</span>
        </span>
      </NuxtLink>

      <DocsAsideTree
        v-show="isActive(link) || !isCollapsed(link)"
        v-if="link.children?.length && (max === null || level + 1 < max)"
        :links="link.children"
        :level="level + 1"
        :parent="link"
        :max="max"
        class="py-2"
      />
    </li>
  </ul>
</template>
