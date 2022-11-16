<script setup lang="ts">
import { upperFirst } from 'scule'

const { prev, next, navigation } = useContent()
const { navDirFromPath } = useContentHelpers()

const directory = (link: any) => {
  const nav = navDirFromPath(link._path, navigation.value || [])

  if (nav && nav[0]) {
    return nav[0]._path
  } else {
    const dirs = link.split('/')
    const directory = dirs.length > 1 ? dirs[dirs.length - 2] : ''
    return directory.split('-').map(upperFirst).join(' ')
  }
}
</script>

<template>
  <div v-if="prev || next" class="docs-prev-next">
    <NuxtLink
      v-if="prev"
      :to="prev._path"
      class="prev"
    >
      <span class="directory">
        {{ directory(prev._path) }}
      </span>

      <span class="title-wrapper">
        <Icon name="heroicons-outline:arrow-sm-left" class="icon" />
        <span class="title">{{ prev.title }}</span>
      </span>
    </NuxtLink>

    <span v-else />

    <NuxtLink
      v-if="next"
      :to="next._path"
      class="next"
    >
      <span class="directory">
        {{ directory(next._path) }}
      </span>

      <span class="title-wrapper">
        <span class="title">{{ next.title }}</span>
        <Icon name="heroicons-outline:arrow-sm-right" class="icon" />
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="ts">
css({
  '.docs-prev-next': {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    gap: '{space.3}',
    '@mq.sm': {
      flexDirection: 'row',
      alignItems: 'center'
    },
    a: {
      position: 'relative',
      minWidth: '0px',
      padding: '{space.3}',
      border: '1px solid {docus.border.primary.default}',
      borderRadius: '{radii.lg}',
      '&:hover': {
        borderColor: '{colors.primary.100}',
        color: '{colors.primary.500}',
      },
      '@dark': {
        '&:hover': {
          borderColor: '{colors.primary.700}',
        }
      },
      '&.prev': {
        '.directory': {
          display: 'block',
          marginBottom: '{space.1}',
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeights.medium}',
          textAlign: 'right',
          color: '{colors.gray.500}',
          // TODO: truncate
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }
      },
      '&.next': {
        '.directory': {
          display: 'block',
          marginBottom: '{space.1}',
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeights.medium}',
          color: '{colors.gray.500}',
          // TODO: truncate
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }
      },
      '.title-wrapper': {
        display: 'flex',
        alignItems: 'center',
        gap: '{space.3}'
      },
      '.icon': {
        flexShrink: 0,
        width: '{space.5}',
        height: '{space.5}'
      },
      '.title': {
        flex: '1 1 0%',
        fontWeight: '{fontWeights.medium}',
        lineHeight: '{leads.5}',
        // TODO: truncate
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    }
  }
})
</style>
