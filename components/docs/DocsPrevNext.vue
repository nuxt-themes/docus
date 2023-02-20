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
      <Icon name="heroicons-outline:arrow-sm-left" class="icon" />
      <div class="wrapper">
        <span v-if="directory(prev._path)" class="directory">
          {{ directory(prev._path) }}
        </span>
        <span class="title">{{ prev.title }}</span>
      </div>
    </NuxtLink>

    <span v-else />

    <NuxtLink
      v-if="next"
      :to="next._path"
      class="next"
    >
      <div class="wrapper">
        <span v-if="directory(next._path)" class="directory">
          {{ directory(next._path) }}
        </span>
        <span class="title">{{ next.title }}</span>
      </div>
      <Icon name="heroicons-outline:arrow-sm-right" class="icon" />
    </NuxtLink>
  </div>
</template>

<style scoped lang="ts">
css({
  '.docs-prev-next': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '{space.3}',
    '@sm': {
      flexDirection: 'row',
      alignItems: 'center'
    },
    a: {
      position: 'relative',
      minWidth: '0px',
      padding: '{space.3}',
      border: '1px solid {elements.border.primary.static}',
      borderRadius: '{radii.md}',
      '&:hover': {
        backgroundColor: '{color.gray.50}',
        borderColor: '{color.gray.50}',
        color: '{color.primary.500}',
      },
      '@dark': {
        '&:hover': {
          backgroundColor: '{color.gray.900}',
          borderColor: '{color.gray.900}',
        }
      },
      '&.prev': {
        textAlign: 'left',
        display: 'flex',
        gap: '{space.3}',
        '.directory': {
          display: 'block',
          marginBottom: '{space.1}',
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.medium}',
          color: '{color.gray.500}',
          truncate: true
        },
        '@sm': {
          '.wrapper': {
            alignItems: 'flex-end'
          }
        }
      },
      '&.next': {
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '{space.3}',
        '.directory': {
          display: 'block',
          marginBottom: '{space.1}',
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeight.medium}',
          color: '{color.gray.500}',
          truncate: true
        },
        '@sm': {
          '.wrapper': {
            alignItems: 'flex-start'
          }
        }
      },
      '.wrapper': {
        display: 'flex',
        flexDirection: 'column',
      },
      '.icon': {
        alignSelf: 'flex-end',
        flexShrink: 0,
        width: '{space.5}',
        height: '{space.5}'
      },
      '.title': {
        flex: '1 1 0%',
        fontWeight: '{fontWeight.medium}',
        lineHeight: '{lead.5}',
        truncate: true
      }
    }
  }
})
</style>
