<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => []
  },
  level: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: null
  },
  parent: {
    type: Object as PropType<any>,
    default: null
  }
})

const route = useRoute()
const docus = useDocus()

const collapsedMap = useState(`docus-docs-aside-collapse-map-${props.parent?._path || '/'}`, () => {
  if (props.level === 0) {
    return {}
  }
  return props.links
    .filter(link => !!link.children)
    .reduce((map, link) => {
      map[link._path] = true
      return map
    }, {})
})

const isActive = (link) => {
  return route.path === link._path
}

const isCollapsed = (link) => {
  if (link.children) {
    // Directory has been toggled manually, use its state
    if (typeof collapsedMap.value[link._path] !== 'undefined') {
      return collapsedMap.value[link._path]
    }

    // Return value grabbed from the link
    if (link?.collapsed) { return link?.collapsed }

    if (docus.value.aside?.collapsed) { return docus.value.aside?.collapsed }
  }

  return false
}

const toggleCollapse = (link) => {
  collapsedMap.value[link._path] = !isCollapsed(link)
}

const hasNesting = computed(() => props.links.some((link: any) => link.children))
</script>

<template>
  <ul>
    <li
      v-for="link in links"
      :key="link._path"
      :class="{
        'ml-2': parent?.icon,
        'pl-4': level > 0 && link.children,
        'border-l': level > 0 || !hasNesting,
        'border-primary-400 dark:border-primary-600': isActive(link),
        'u-border-gray-100 hover:u-border-gray-300': !isActive(link),
      }"
    >
      <button v-if="link.children" class="u-text-gray-900 group flex w-full cursor-pointer items-center justify-between py-1.5 text-sm font-semibold" @click="toggleCollapse(link)">
        <span class="flex items-center">
          <Icon v-if="link?.navigation?.icon || link.icon" :name="link?.navigation?.icon || link.icon" class="w-4 h-4 mr-2" />
          <span>{{ link?.navigation?.title || link.title }}</span>
        </span>
        <span class="flex">
          <Icon :name="isCollapsed(link) ? 'lucide:chevrons-up-down' : 'lucide:chevrons-down-up'" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" />
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
          <Icon v-if="link?.navigation?.icon || link.icon" :name="link?.navigation?.icon || link.icon" class="w-4 h-4 mr-1" />
          <span>{{ link?.navigation?.title || link.title }}</span>
        </span>
      </NuxtLink>

      <DocsAsideTree
        v-show="!isCollapsed(link)"
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
