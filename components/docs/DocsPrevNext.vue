<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig

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
    class="docs-prev-next"
    :class="[tokens.docsPrevNext.root]"
  >
    <NuxtLink
      v-if="prev && prev._path"
      :to="prev._path"
      class="prev group"
      :class="[Object.values(tokens.docsPrevNext.link)]"
    >
      <Icon
        v-if="prev.icon || prevMeta?.directoryIcon"
        :name="prev.icon || prevMeta?.directoryIcon"
        :class="[Object.values(tokens.docsPrevNext.icon)]"
      />
      <span
        v-if="prevMeta"
        class="directory"
        :class="[Object.values(tokens.docsPrevNext.directory)]"
      >
        {{ prevMeta?.directoryTitle }}
      </span>
      <span
        class="title"
        :class="[Object.values(tokens.docsPrevNext.title)]"
      >{{ prev.title }}</span>
      <span
        class="description"
        :class="[Object.values(tokens.docsPrevNext.description)]"
      >{{ prev.description }}</span>
    </NuxtLink>

    <NuxtLink
      v-if="next && next._path"
      :to="next._path"
      class="next group"
      :class="[Object.values(tokens.docsPrevNext.link)]"
    >
      <Icon
        v-if="next.icon || nextMeta?.directoryIcon"
        :name="next.icon || nextMeta?.directoryIcon"
        :class="[Object.values(tokens.docsPrevNext.icon)]"
      />
      <span
        v-if="nextMeta"
        class="directory"
        :class="[Object.values(tokens.docsPrevNext.directory)]"
      >
        {{ nextMeta?.directoryTitle }}
      </span>
      <span
        class="title"
        :class="[Object.values(tokens.docsPrevNext.title)]"
      >{{ next.title }}</span>
      <span
        class="description"
        :class="[Object.values(tokens.docsPrevNext.description)]"
      >{{ next.description }}</span>
    </NuxtLink>
  </div>
</template>
