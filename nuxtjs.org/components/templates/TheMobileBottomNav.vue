<template>
  <nav
    class="
      fixed
      bg-light-elevatedSurface
      dark:bg-dark-elevatedSurface
      border-t
      left-0
      bottom-0
      right-0
      z-30
      border-light-border
      dark:border-dark-border
      block
      lg:hidden
      transition-colors
      duration-300
      ease-linear
    "
  >
    <div class="flex justify-between items-center h-16">
      <template v-for="link in $t('header.links')">
        <nuxt-link
          v-if="!link.href"
          :key="link.slug"
          class="
            block
            md:flex
            md:justify-center
            w-full
            p-2
            md:p-4
            text-light-onSurfacePrimary
            dark:text-dark-onSurfacePrimary
            hover:no-underline
            hover:text-primary-base
            dark:hover:text-primary-base
            text-center
            visited:text-nuxt-gray
            transition-colors
            duration-300
            ease-linear
          "
          :to="
            localePath({
              name: link.slug,
              params: { book: 'get-started', slug: 'installation' }
            })
          "
        >
          <SvgIcon
            :name="link.icon"
            class="inline-block h-5 fill-current mb-1"
            :class="{
              'text-nuxt-lightgreen': $route.params.section === link.slug
            }"
          />
          <span
            class="
              block
              text-xs
              md:text-base
              md:pl-3
              font-medium
              text-light-onSurfacePrimary
              dark:text-dark-onSurfacePrimary
              transition-colors
              duration-300
              ease-linear
            "
          >
            {{ link.name }}
          </span>
        </nuxt-link>
        <a
          v-else
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener"
          class="
            iblock
            md:flex
            md:justify-center
            w-full
            p-2
            md:p-4
            text-light-onSurfacePrimary
            dark:text-dark-onSurfacePrimary
            hover:no-underline
            hover:text-primary-base
            dark:hover:text-primary-base
            text-center
            visited:text-nuxt-gray
            transition-colors
            duration-300
            ease-linear
          "
        >
          <SvgIcon
            :name="link.icon"
            class="inline-block h-5 fill-current mb-1"
          />
          <span
            class="
              block
              text-xs
              md:text-base
              md:pl-3
              font-medium
              text-light-onSurfacePrimary
              dark:text-dark-onSurfacePrimary
              transition-colors
              duration-300
              ease-linear
            "
          >
            {{ link.name }}
          </span>
        </a>
      </template>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
nav {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
