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
  <div v-if="prev || next" class="docs-prev-next">
    <NuxtLink
      v-if="prev && prev._path"
      :to="prev._path"
      class="prev"
    >
      <Icon v-if="prev.icon !== false" :name="prev.icon || prevMeta?.directoryIcon" />
      <span v-if="prevMeta" class="directory">
        {{ prevMeta?.directoryTitle }}
      </span>
      <span class="title">{{ prev.title }}</span>
    </NuxtLink>

    <NuxtLink
      v-if="next && next._path"
      :to="next._path"
      class="next"
    >
      <Icon v-if="next.icon !== false" :name="next.icon || nextMeta?.directoryIcon" />
      <span v-if="nextMeta" class="directory">
        {{ nextMeta?.directoryTitle }}
      </span>
      <span class="title">{{ next.title }}</span>
      <span class="description">{{ next.description }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="ts">
css({
  '.docs-prev-next': {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '{docus.docs.prevNext.gap}',
    '@sm': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    a: {
      position: 'relative',
      padding: '{docus.docs.prevNext.padding}',
      border: '{docus.docs.prevNext.border}',
      borderRadius: '{docus.docs.prevNext.borderRadius}',
      backgroundColor: '{docus.docs.prevNext.backgroundColor}',
      boxShadow: '{docus.docs.prevNext.boxShadow.static}',
      '&:hover': {
        boxShadow: '{docus.docs.prevNext.boxShadow.hover}',
      },
      '&:hover .title': {
        color: '{docus.docs.prevNext.title.color.hover}',
      },
      '&.prev': {
        display: 'flex',
        flexDirection: 'column',
      },
      '&.next': {
        display: 'flex',
        flexDirection: 'column',
        '@sm': {
          gridColumnStart: '2',
        },
      },
      '.directory': {
        display: 'block',
        marginBottom: '{docus.docs.prevNext.directory.marginBottom}',
        fontSize: '{docus.docs.prevNext.directory.fontSize}',
        lineHeight: '{docus.docs.prevNext.directory.lineHeight}',
        fontWeight: '{docus.docs.prevNext.directory.fontWeight}',
        color: '{docus.docs.prevNext.directory.color}',
      },
      '.icon': {
        width: '{docus.docs.prevNext.icon.size}',
        height: '{docus.docs.prevNext.icon.size}',
        marginBottom: '{docus.docs.prevNext.icon.marginBottom}',
      },
      '.title': {
        fontWeight: '{docus.docs.prevNext.title.fontWeight}',
        marginBottom: '{docus.docs.prevNext.title.marginBottom}',
      },
      '.description': {
        fontSize: '{docus.docs.prevNext.description.fontSize}',
        lineHeight: '{docus.docs.prevNext.description.lineHeight}',
        color: '{docus.docs.prevNext.description.color}',
        lineClamp: 3
      }
    }
  }
})
</style>
