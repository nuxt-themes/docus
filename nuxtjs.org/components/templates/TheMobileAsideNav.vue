<template>
  <div
    v-click-outside="clickOutsideHandler"
    class="
      fixed
      left-0
      z-20
      block
      w-full
      header_mobile_aside
      shadow-nuxt
      lg:hidden
      sm:w-1/2
    "
    :class="{ 'header_mobile_aside--open': show }"
  >
    <div
      class="
        h-full
        mx-auto
        transition-colors
        duration-300
        ease-linear
        light:bg-light-surface
        dark:bg-dark-surface
      "
    >
      <div class="relative h-full content-wrapper">
        <div class="h-full pt-4 overflow-y-auto">
          <transition-group
            v-for="(sublinks, group) in sortedLinks"
            :key="group"
            tag="div"
            name="list"
            class="header_mobile_aside_group"
          >
            <h3 :key="`title-${group}`" class="pb-2 text-gray-500 uppercase">
              {{ $t(`content.${section}.${group}`) }}
            </h3>
            <ul :key="`list-${group}`" class="pb-6">
              <li v-for="(link, index) in sublinks" :key="index" class="py-2">
                <NuxtLink
                  class="
                    block
                    transition-colors
                    duration-300
                    ease-linear
                    dark:text-dark-onSurfacePrimary
                    hover:text-nuxt-lightgreen
                  "
                  active-class
                  exact
                  exact-active-class="text-nuxt-lightgreen"
                  :to="toLink(link)"
                  @click.native="show = false"
                >
                  {{ link.title }}
                </NuxtLink>
              </li>
            </ul>
          </transition-group>
        </div>
        <button
          class="
            absolute
            flex
            items-center
            justify-center
            w-10
            h-10
            transition-colors
            duration-300
            ease-linear
            bg-gray-200
            inner-button
            sm:hidden
            text-nuxt-gray
            dark:bg-dark-elevatedSurface
            dark:text-dark-onSurfaceSecondary
          "
          @click="show = false"
        >
          <SvgIcon
            name="times"
            class="
              block
              h-5
              transition-colors
              duration-300
              ease-linear
              fill-current
            "
          />
        </button>
      </div>

      <button
        class="
          absolute
          flex
          items-center
          justify-center
          w-10
          h-10
          transition-colors
          duration-300
          ease-linear
          bg-gray-200
          bookmark-button
          text-nuxt-gray
          dark:bg-dark-surface
          dark:text-dark-onSurfaceSecondary
        "
        @click="show = !show"
      >
        <ListIcon
          v-if="!show"
          class="
            block
            transition-colors
            duration-300
            ease-linear
            stroke-current
            text-nuxt-gray
            dark:text-dark-onSurfaceSecondary
          "
        />
        <SvgIcon
          v-else
          name="times"
          class="
            block
            h-5
            transition-colors
            duration-300
            ease-linear
            fill-current
          "
        />
      </button>
    </div>
  </div>
</template>

<script>
import sortBy from 'lodash.sortby'

import ListIcon from '~/assets/images/list.svg?inline'

export default {
  components: {
    ListIcon
  },
  props: {
    links: {
      type: Object,
      default: () => {}
    },
    section: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    path() {
      return this.$route.path.slice(-1) === '/'
        ? this.$route.path.slice(0, -1)
        : this.$route.path
    },
    sortedLinks() {
      const links = {}
      sortBy(Object.keys(this.links), link => {
        return Object.keys(this.$i18n.t(`content.${this.section}`)).indexOf(
          link
        )
      }).forEach(key => {
        links[key] = this.links[key]
      })
      return links
    }
  },
  methods: {
    toLink(link) {
      return this.localePath({
        name: this.section + '-slug',
        params: { slug: link.slug }
      })
    },
    clickOutsideHandler() {
      if (this.show) {
        this.show = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header_mobile_aside {
  bottom: theme('spacing.16');
  top: theme('spacing.16');
  transform: translateX(calc(-100% - 1px));
  transition-duration: 0.35s;
  transition-property: transform;
  // transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  transition-timing-function: theme(
    'transitionTimingFunction.ease-in-out-material-sharp'
  );

  @screen lg {
    top: theme('spacing.24');
  }
}

.header_mobile_aside--open {
  transform: translateX(0);
  transition-delay: 0s;

  & .header_mobile_aside_group {
    transform: translateX(0);
  }
}

.content-wrapper {
  margin-left: auto;
  padding-left: 1rem;

  @screen sm {
    max-width: calc(theme('screens.sm') / 2);
  }

  @screen md {
    max-width: calc(theme('screens.md') / 2);
  }
}

button {
  outline: none;
}

.bookmark-button {
  border-radius: 0 9999px 9999px 0;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.101562);
  right: 0;
  top: 1rem;
  transform: translateX(100%);
}

.inner-button {
  border-radius: 100%;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.101562);
  right: 1rem;
  top: 1rem;
}
</style>
