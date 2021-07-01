<template>
  <div
    class="
      fixed
      top-0
      left-0
      w-auto
      h-full
      overflow-auto
      pointer-events-auto
      min-h-fill-available
      lg:h-screen lg:sticky lg:top-header lg:w-60
    "
  >
    <div class="w-auto h-full overflow-auto d-bg-header dark:lg:bg-transparent lg:bg-transparent">
      <!-- Aside Header -->
      <div class="flex items-center w-full px-4 sm:px-6 lg:hidden h-header d-aside-header-bg">
        <button
          class="
            flex-1
            transition-colors
            duration-200
            focus:outline-none
            lg:hidden
            d-secondary-text
            hover:d-secondary-text-hover
          "
          @click.stop="$menu.toggle"
        >
          <IconArrowLeft class="w-5 h-5" />
        </button>
        <div class="flex items-center justify-end w-full h-header lg:hidden space-x-3">
          <LangSwitcher />
          <ColorSwitcher size="w-5 h-5" padding="p-1" />
          <SocialIcons size="w-5 h-5" padding="p-1" />
        </div>
      </div>

      <!-- Aside Navigation -->
      <nav
        class="
          flex flex-col
          justify-between
          lg:justify-start
          max-w-sm
          overflow-y-auto
          text-sm
          font-medium
          lg:h-[reset]
          h-(full-header)
        "
      >
        <div class="py-4 pl-4 pr-24 sm:pl-6 lg:pr-0 lg:pt-10">
          <AsideTop />
          <NuxtLink v-if="parent" class="mb-3 block" :to="$contentLocalePath(parent.to)">
            <IconArrowLeft width="16" height="16" class="inline-block mr-2" /> {{ parent.title }}
          </NuxtLink>
          <ul>
            <template v-for="link in links">
              <AsideNavigationItem
                v-if="link.nested !== false && link.children.length"
                :key="link.to"
                :title="link.title"
                :docs="link.children"
                :collapse="link.collapse === true"
                @toggle="toggleLinks(link)"
              />
              <AsideNavigationItem v-else :key="link.to" :docs="[link]" />
            </template>
          </ul>
          <AsideBottom />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()

    const links = ref($docus.currentNav.value.links)

    watch(
      $docus.currentNav,
      newVal => {
        links.value = newVal.links
      },
      { deep: true }
    )

    function toggleLinks(link) {
      const newLinks = $docus.currentNav.value.links.map(l => {
        l = { ...l }

        if (link.slug === l.slug) {
          l.collapse = !link.collapse
        }

        return l
      })

      links.value = newLinks
    }

    const parent = computed(() => $docus.currentNav.value.parent)

    const lastRelease = computed(() => $docus.lastRelease?.value)

    return { toggleLinks, links, parent, lastRelease }
  }
})
</script>
