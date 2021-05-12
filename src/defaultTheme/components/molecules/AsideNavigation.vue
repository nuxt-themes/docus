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
      lg:h-screen
      min-h-fill-available
      lg:sticky
      lg:top-header
      lg:w-60
    "
  >
    <div class="w-auto h-full overflow-auto bg-white dark:bg-gray-900 lg:bg-transparent">
      <!-- Aside Header -->
      <div class="flex items-center w-full px-4 sm:px-6 lg:hidden h-header bg-gray-50 dark:bg-gray-800">
        <button
          class="
            flex-1
            text-gray-500
            transition-colors
            duration-200
            focus:outline-none
            lg:hidden
            dark:text-gray-500
            hover:text-gray-700
            dark:hover:text-gray-400
          "
          @click.stop="$menu.toggle"
        >
          <IconArrowLeft class="w-5 h-5" />
        </button>
        <div class="flex items-center justify-end w-full h-header lg:hidden">
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
          h-(full-header)
        "
      >
        <div class="py-4 pl-4 pr-24 sm:pl-6 lg:pr-0 lg:pt-10">
          <AsideTop />
          <ul>
            <template v-for="link in links">
              <AsideNavigationItem
                v-if="link.navigation.children !== false && link.children.length"
                :key="link.navigation.title"
                :title="link.navigation.title"
                :docs="link.children"
              />
              <AsideNavigationItem v-else :key="link.navigation.title" :docs="[link]" />
            </template>
          </ul>
          <AsideBottom />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  computed: {
    links() {
      return this.$docus.currentNav.value
    },
    lastRelease() {
      return this.$docus.lastRelease?.value
    }
  }
})
</script>
