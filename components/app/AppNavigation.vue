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
    class="[&.vertical]:mb-4"
    :class="[vertical && 'vertical']"
  >
    <ul
      class="flex flex-1 max-w-full truncate justify-center [.vertical_&]:flex-col [.vertical_&]:items-start flex-row items-center gap-2 [.vertical_&]:gap-0"
    >
      <li
        v-for="link in tree"
        :key="link._path"
        class="inline-flex w-full"
      >
        <NuxtLink
          class="link w-full flex items-center [.vertical_&]:py-2 py-1 px-2 text-sm font-semibold gap-2 [&.active]:text-primary-500 hover:text-primary-500"
          :to="link.redirect? link.redirect : navBottomLink(link)"
          :class="[ isActive(link) && 'active' ]"
        >
          <Icon
            v-if="link.icon && config?.header?.showLinkIcon"
            class="w-5 h-5"
            :name="link.icon"
          />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
