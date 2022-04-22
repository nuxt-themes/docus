<script setup lang="ts">
import type { PropType } from 'vue'

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
    openDir(link.slug)
    // Select element for mobile nav
    if (props.max !== null && props.level + 1 === props.max)
      emit('select', link)
  }
  else {
    router.push(link.slug)
    emit('close')
  }
}

function openDir(slug, force?) {
  isChildOpen[slug] = force ? true : !isChildOpen[slug]
}

watch(() => route.path, () => {
  const paths = route.path.split('/')
  for (let i = paths.length - 1; i > 1; i--) {
    paths.pop()
    openDir(paths.join('/'), true)
  }
}, { immediate: true })
</script>

<template>
  <ul :class="{ 'pl-4': level > 1 }">
    <li
      v-for="(link, index) in tree"
      :key="link.slug"
      :class="{
        'border-l-2': level > 0,
        'u-border-gray-900': isActive(link),
        'u-border-gray-300 hover:u-border-gray-900': !isActive(link)
      }"
    >
      <NuxtLink
        class="block py-1.5 flex items-center justify-between focus:outline-none cursor-pointer"
        :exact="link.exact"
        :class="{
          'pl-4 lg:text-sm': level > 0,
          '!pt-0': level === 0 && index === 0,
          'font-semibold u-text-gray-900': isActive(link),
          'font-medium u-text-gray-500 hover:u-text-gray-900 focus:u-text-gray-700': !isActive(link)
        }"
        @click.stop.prevent="onClick(link)"
      >
        <span>{{ link.title }}</span>

        <!-- <UIcon v-if="link.icon" :name="link.icon" class="w-5 h-5 u-text-gray-500" /> -->
      </NuxtLink>

      <DocsAsideTree
        v-if="link.children?.length && (max === null || ((level + 1) < max))"
        v-show="isChildOpen[link.slug]"
        :tree="link.children"
        :level="level + 1"
        :max="max"
        class="py-2"
        @select="link => $emit('select', link)"
        @close="$emit('close')"
      />
    </li>
  </ul>
</template>
