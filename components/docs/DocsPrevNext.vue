<script setup lang="ts">
const { prev, next, navigation } = useContent()

function findNavItem (children: any, path: string, parent: any) {
  for (const child of children) {
    if (child._path === path) {
      return {
        directoryTitle: parent.title,
        directoryIcon: parent.icon
      }
    }
    if (child.children) {
      const result: any = findNavItem(child.children, path, child)
      if (result) {
        return result
      }
    }
  }
  return undefined
}

function getNavItemMeta (path: string) {
  let result
  for (const item of navigation.value) {
    if (item.children) {
      const found = findNavItem(item.children, path, item)
      if (found) {
        result = found
      }
    }
  }
  return result
}

const prevMeta = computed(() => {
  if (prev.value?._path) {
    return getNavItemMeta(prev.value._path)
  }
  return undefined
})

const nextMeta = computed(() => {
  if (next.value?._path) {
    return getNavItemMeta(next.value._path)
  }
  return undefined
})
</script>

<template>
  <div
    v-if="prev || next"
    class="docs-prev-next grid grid-cols-1 sm:grid-cols-2 gap-8"
  >
    <NuxtLink
      v-if="prev && prev._path"
      :to="prev._path"
      class="prev group relative flex flex-col p-6 border rounded-2xs border-primary-static"
    >
      <Icon
        v-if="prev.icon || prevMeta?.directoryIcon"
        :name="prev.icon || prevMeta?.directoryIcon"
        class="w-8 h-8 mb-4"
      />
      <span
        v-if="prevMeta"
        class="directory block mb-3 text-xs font-medium text-gray-500"
      >
        {{ prevMeta?.directoryTitle }}
      </span>
      <span class="title group-hover:text-primary-500 font-medium mb-2">{{ prev.title }}</span>
      <span class="description text-sm text-gray-500 line-clamp-3">{{ prev.description }}</span>
    </NuxtLink>

    <NuxtLink
      v-if="next && next._path"
      :to="next._path"
      class="next group relative flex flex-col p-6 border rounded-2xs border-primary-static"
    >
      <Icon
        v-if="next.icon || nextMeta?.directoryIcon"
        :name="next.icon || nextMeta?.directoryIcon"
        class="w-8 h-8 mb-4"
      />
      <span
        v-if="nextMeta"
        class="directory block mb-3 text-xs font-medium text-gray-500"
      >
        {{ nextMeta?.directoryTitle }}
      </span>
      <span class="title group-hover:text-primary-500 font-medium mb-2">{{ next.title }}</span>
      <span class="description text-sm text-gray-500 line-clamp-3">{{ next.description }}</span>
    </NuxtLink>
  </div>
</template>
