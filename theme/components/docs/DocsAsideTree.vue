<script setup lang="ts">
import type { PropType } from 'vue'
import { reactive, useRoute, useRouter, watch } from '#imports'

const props = defineProps({
  tree: {
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
})
const emit = defineEmits(['close', 'select'])

const route = useRoute()
const router = useRouter()

const isChildOpen = reactive({})

function isActive(link) {
  return link.exact ? route.path === link.slug : route.path.startsWith(link.slug)
}

function onClick(link) {
  if (link.children?.length) {
    // Open dir when element is collapsible
    toggleDir(link.slug)

    // Select element for mobile nav
    if (props.max !== null && props.level + 1 === props.max) emit('select', link)
  } else {
    router.push(link.slug)
    emit('close')
  }
}

function toggleDir(slug, force?) {
  isChildOpen[slug] = force ? true : !isChildOpen[slug]
}

watch(
  () => route.path,
  () => {
    const paths = route.path.split('/')
    for (let i = paths.length; i > 1; i--) {
      paths.pop()
      toggleDir(paths.join('/'), true)
    }

    toggleDir(route.path, true)
  },
  { immediate: true },
)
</script>

<template>
  <ul :class="{ 'pl-4': level > 1 }">
    <li
      v-for="(link, index) in tree"
      :key="link.slug"
      :class="[
        'transition-base transition-colors',
        {
          'border-l-2': level > 0,
          'border-primary-600': isActive(link),
          'border-primary-300 hover:border-primary-600': !isActive(link),
        },
      ]"
    >
      <NuxtLink
        class="flex cursor-pointer items-center justify-between py-1.5 focus:outline-none"
        :exact="link.exact"
        :class="{
          'pl-4': level > 0,
          '!text-primary text-xl font-bold': level === 0,
          '!pt-0': level === 0 && index === 0,
          'text-secondary-active': isActive(link),
          'text-secondary text-secondary-hover': !isActive(link),
        }"
        @click.stop.prevent="onClick(link)"
      >
        <span>{{ link.title }}</span>

        <Icon v-if="link.icon" :name="link.icon" class="u-text-gray-500 h-5 w-5" />
      </NuxtLink>

      <DocsAsideTree v-if="link.children?.length && (max === null || level + 1 < max)" v-show="isChildOpen[link.slug]" :tree="link.children" :level="level + 1" :max="max" class="py-2" @select="(link) => $emit('select', link)" @close="$emit('close')" />
    </li>
  </ul>
</template>
