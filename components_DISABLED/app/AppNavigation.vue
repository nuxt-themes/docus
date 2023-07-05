<script setup lang="ts">
const route = useRoute()
const { navBottomLink } = useContentHelpers()
const { navigation } = useContent()
const { config } = useDocus()

defineProps({
  vertical: {
    type: Boolean,
    default: false
  }
})

const hasNavigation = computed(() => !!config.value.aside?.level)

const filtered = computed(() => config.value.header?.exclude || [])

const tree = computed(() => {
  return (navigation.value || []).filter((item: any) => {
    if (filtered.value.includes(item._path as never)) { return false }
    return true
  })
})

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav
    v-if="hasNavigation"
    :class="{vertical}"
  >
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
          <Icon
            v-if="link.icon && config?.header?.showLinkIcon"
            :name="link.icon"
          />
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
    '&.vertical': {
      marginBottom: '{docus.app.navigation.vertical.marginBottom}',
    },
    ul: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1',
      maxWidth: '100%',
      truncate: true,
      gap: '{docus.app.navigation.gap}',

      '.vertical &&': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '{docus.app.navigation.vertical.gap}',
        '.link': {
          padding: '{docus.app.navigation.vertical.link.padding}',
        }
      },

      li: {
        display: 'inline-flex',
        fontWeight: '{docus.app.navigation.link.fontWeight}',
        width: '100%',
      },

      '.link': {
        display: 'flex',
        alignItems: 'center',
        gap: '{docus.app.navigation.link.gap}',
        padding: '{docus.app.navigation.link.padding}',
        fontSize: '{docus.app.navigation.link.fontSize}',
        // borderRadius: '{radii.2xs}',
        width: '100%',
        outline: 'none',
        transition: 'background 200ms ease',

        '.icon': {
          display: 'inline-flex !important',
          alignItems: 'center',
          justifyContent: 'center',
          width: '{docus.app.navigation.link.icon.size} !important',
          height: '{docus.app.navigation.link.icon.size} !important',
        },

        '&:active, &.active, &:hover': {
          color: '{color.primary.500}',
          // backgroundColor: '{color.gray.100}',
          // '@dark': {
          //   backgroundColor: '{color.gray.800}',
          // },
        },

        // '&.active': {
        //   boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        //   fontWeight: '{fontWeight.semibold}'
        // }
      }
    }
  }
})
</style>
