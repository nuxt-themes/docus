<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig
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
    :class="[vertical && 'vertical', tokens.appNavigation.marginBottom]"
  >
    <ul class="flex flex-1 max-w-full truncate justify-center [.vertical_&]:flex-col [.vertical_&]:items-start flex-row items-center" :class="[tokens.appNavigation.ul.gap]">
      <li
        v-for="link in tree"
        :key="link._path"
        class="inline-flex w-full"
      >
        <NuxtLink
          class="link w-full flex items-center"
          :to="link.redirect? link.redirect : navBottomLink(link)"
          :class="[ isActive(link) && 'active', tokens.appNavigation.link.padding, tokens.appNavigation.link.fontSize, tokens.appNavigation.link.fontWeight, tokens.appNavigation.link.gap, Object.values(tokens.appNavigation.link.active), Object.values(tokens.appNavigation.link.hover)]"
        >
          <Icon
            :class="[tokens.appNavigation.icon.width, tokens.appNavigation.icon.height]"
            v-if="link.icon && config?.header?.showLinkIcon"
            :name="link.icon"
          />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
