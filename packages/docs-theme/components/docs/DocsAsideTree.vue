<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useRoute, useRouter } from '#imports'

const props = defineProps({
  tree: {
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
  }
})
const route = useRoute()

function isActive (link) {
  return link.exact ? route.path === link.path : route.path.startsWith(link.path)
}

const hasNesting = computed(() => props.tree.some((link: any) => link.children))
</script>

<template>
  <ul :class="{ 'pl-4': level > 1 }">
    <li
      v-for="(link, index) in tree"
      :key="link.path"
      class="transition-colors transition-base"
      :class="[
        {
          'border-l-2': level > 0 || !hasNesting,
          'border-primary-400 dark:border-primary-600': isActive(link),
          'hover:border-primary-400 border-gray-200 dark:border-gray-700': !isActive(link),
        },
      ]"
    >
      <div v-if="link.children" class="flex items-center justify-between mt-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
        <span class="inline-flex items-center">
          <Icon v-if="link.icon" :name="link.icon" class="w-4 h-4 mr-2" />
          <span>{{ link.title }}</span>
        </span>
      </div>
      <NuxtLink
        v-else
        :to="link.path"
        class="flex items-center justify-between text-sm py-1.5"
        :exact="link.exact"
        :class="{
          'pl-3': level > 0 || !hasNesting,
          '!pt-0': level === 0 && index === 0,
          'text-primary font-semibold': isActive(link),
          'hover:text-secondary-hover': !isActive(link),
        }"
      >
        <span class="inline-flex items-center">
          <Icon v-if="link.icon" :name="link.icon" class="w-5 h-5 mr-2" />
          <span>{{ link.title }}</span>
        </span>
      </NuxtLink>

      <DocsAsideTree
        v-if="link.children?.length && (max === null || level + 1 < max)"
        :tree="link.children"
        :level="level + 1"
        :max="max"
        class="py-2"
        @close="$emit('close')"
      />
    </li>
  </ul>
</template>
