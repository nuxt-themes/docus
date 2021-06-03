<template>
  <aside
    class="
      block
      mt-8
      -mx-4
      bg-gray-100
      opacity-transition
      lg:bg-transparent
      lg:mt-0
      lg:mx-0
      lg:inset-0
      z-90
      lg:mb-0
      lg:static
      lg:h-auto
      lg:overflow-y-visible
      lg:pt-0
      lg:w-1/4
      lg:block
    "
  >
    <div
      class="
        h-full
        overflow-y-auto
        scrolling-touch
        text-center
        lg:text-left
        lg:h-auto
        lg:block
        lg:relative
        lg:sticky
        lg:top-24
      "
    >
      <nav
        class="
          pt-8
          lg:overflow-y-auto
          lg:block
          lg:pl-0
          lg:pr-8
          sticky?lg:max-h-(screen-24)
        "
        :class="{ hidden: !showNav }"
      >
        <div v-for="(sublinks, group) in sortedLinks" :key="`links-${group}`">
          <component
            :is="$route.params.book === group ? `h3` : 'nuxt-link'"
            :key="`title-${group}`"
            :to="{
              name: 'docs-2.x-book-slug',
              params: { book: group, slug: sublinks[0].slug }
            }"
            class="
              flex
              items-center
              pb-2
              font-medium
              uppercase
              transition-colors
              duration-300
              ease-linear
              text-light-onSurfaceSecondary
              dark:text-dark-onSurfaceSecondary
            "
            :class="{
              'hover:text-nuxt-lightgreen mb-4 block':
                $route.params.book !== group,
              'font-bold': $route.params.book === group
            }"
          >
            <SvgIcon
              v-if="$route.params.book === group"
              name="chevron-down"
              class="w-4 h-4 mr-2"
            />
            <SvgIcon v-else name="chevron-right" class="w-4 h-4 mr-2" />
            <span>{{ $t(`content.guides.${group}`) }}</span>
          </component>
          <ul v-if="$route.params.book === group" class="pb-8 pl-2">
            <li
              v-for="(link, index) in sublinks"
              :key="index"
              class="
                text-light-onSurfacePrimary
                dark:text-dark-onSurfacePrimary
              "
            >
              <NuxtLink
                class="
                  flex
                  justify-between
                  p-2
                  pl-4
                  transition-colors
                  duration-300
                  ease-linear
                  rounded
                  hover:text-nuxt-lightgreen
                  dark:hover:text-nuxt-lightgreen
                "
                exact-active-class="bg-green-100 text-nuxt-lightgreen dark:bg-green-800 dark:text-white"
                :to="toLink(group, link)"
              >
                <template v-if="link.menu">
                  {{ link.menu }}
                  <AppLabel
                    v-if="link.target === 'Static'"
                    class="text-green-500 dark:text-green-300"
                  >
                    {{ link.target }}
                  </AppLabel>
                  <AppLabel
                    v-if="link.target === 'Server'"
                    class="text-blue-500 dark:text-blue-300"
                  >
                    {{ link.target }}
                  </AppLabel>
                  <AppLabel
                    v-if="link.target === 'Static & Server'"
                    class="
                      px-1
                      py-0
                      ml-2
                      text-purple-500
                      lowercase
                      align-middle
                      rounded-sm
                      dark:text-purple-300
                      text-ss
                    "
                  >
                    {{ link.target }}
                  </AppLabel>
                </template>
                <template v-else>
                  {{ link.menuTitle || link.title }}
                </template>
              </NuxtLink>
            </li>
          </ul>
        </div>
        <p class="pb-6 font-bold uppercase">
          <NuxtLink
            to="/docs/release-notes"
            class="
              block
              p-2
              text-sm
              bg-gray-100
              border
              rounded
              dark:bg-dark-surface
              dark:border-gray-900
              text-light-onSurfaceSecondary
              dark:text-dark-onSurfaceSecondary
            "
            active-class=""
            exact-active-class=""
          >
            {{ $t('common.version') }}
            <span class="text-nuxt-lightgreen">{{ $config.nuxtVersion }}</span>
          </NuxtLink>
        </p>
      </nav>
    </div>
  </aside>
</template>

<script>
import sortBy from 'lodash.sortby'

export default {
  props: {
    links: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return { current: 0, setInter: null, showNav: false }
  },
  computed: {
    sortedLinks() {
      const links = {}
      sortBy(Object.keys(this.links), link => {
        return Object.keys(this.$i18n.t('content.guides')).indexOf(link)
      }).forEach(key => {
        links[key] = this.links[key]
      })
      return links
    }
  },
  methods: {
    toLink(group, link) {
      return this.localePath({
        name: 'docs-2.x-book-slug',
        params: { book: group, slug: link.slug }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
