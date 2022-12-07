<script setup lang="ts">
const route = useRoute()
const { navBottomLink } = useContentHelpers()
const { navigation } = useContent()
const docus = useDocus()

const hasNavigation = computed(() => !!docus.value.aside?.level)

const filtered = computed(() => docus.value.header?.exclude || [])

const tree = computed(() => {
  return (navigation.value || []).filter((item: any) => {
    if (filtered.value.includes(item._path)) { return false }
    return true
  })
})

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="link in tree"
        :key="link._path"
      >
        <NuxtLink
          class="link"
          :to="link.redirect? link.redirect : navBottomLink(link)"
          :class="{ active: isActive(link) }"
        >
          <Icon v-if="link.icon && docus.header.showLinkIcon" :name="link.icon" />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="ts">
css({
  nav: {
    display: 'none',
    '@lg': {
      display: 'block'
    },
    ul: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1',
      maxWidth: '100%',
      // TODO: truncate
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      '& > * + *': {
        marginLeft: '{space.2}'
      },

      li: {
        display: 'inline-flex',
        gap: '{space.1}',
      },

      '.link': {
        display: 'flex',
        alignItems: 'center',
        gap: '{space.2}',
        padding: '{space.2} {space.4}',
        fontSize: '{fontSize.sm}',
        borderRadius: '{radii.md}',
        outline: 'none',
        transition: 'background 200ms ease',

        svg: {
          display: 'inline-block'
        },

        '&:active,&.active,&:hover': {
          backgroundColor: '{color.gray.100}',
          '@dark': {
            backgroundColor: '{color.gray.900}',
          },
        },

        '&.active': {
          boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
          fontWeight: '{fontWeight.semibold}'
        }
      }
    }
  }
})
</style>
