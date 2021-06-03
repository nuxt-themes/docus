<template>
  <div class="pt-4">
    <div class="pt-3 mt-6 border-t border-light-border dark:border-dark-border">
      <h3
        v-if="contributors.length"
        class="relative table my-2 text-xl transition-colors duration-300 ease-linear empty-after after:block after:border-2 after:rounded dark:after:border-dark-onSurfacePrimary light:after:border-light-onSurfacePrimary after:mt-2 after:mb-1 after:w-4/5 text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary"
      >
        {{ $t('contribute.title') }}
      </h3>
      <div v-if="contributors.length">
        <a
          v-for="contributor of contributors"
          :key="contributor.login"
          :href="`https://github.com/${contributor.login}`"
          rel="noopener"
          target="_blank"
          class="inline-flex mb-2 mr-2 overflow-hidden transition-colors duration-300 ease-linear border rounded text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary bg-light-surfaceElevated light:hover:bg-gray-300 dark:bg-dark-elevatedSurface dark:hover:bg-dark-surface border-light-border dark:border-dark-border"
        >
          <img
            :alt="contributor.name"
            :srcset="`https://github.com/${contributor.login}.png?size=32 1x, https://github.com/${contributor.login}.png?size=64 2x`"
            :src="`https://github.com/${contributor.login}.png?size=32`"
            class="h-8"
          />
          <span class="inline-block px-2 leading-loose">
            {{ contributor.name }}
          </span>
        </a>
      </div>
      <p
        v-if="docLink && $route.params.book"
        class="pt-1 mb-8 transition-colors duration-300 ease-linear text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary"
      >
        {{ $t('contribute.docs') }}
        <a
          :href="docLink"
          target="_blank"
          rel="noopener"
          class="text-primary-base hover:underline"
        >
          {{ $t('contribute.edit_on_github') }}
        </a>
      </p>
      <p
        v-else-if="docLink && $route.path.startsWith('/blog')"
        class="pt-1 mb-8 transition-colors duration-300 ease-linear text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary"
      >
        {{ $t('contribute.blog') }}
        <a
          :href="docLink"
          target="_blank"
          rel="noopener"
          class="text-primary-base hover:underline"
        >
          {{ $t('contribute.edit_on_github') }}
        </a>
      </p>

      <AdsCarbonText :key="$route.path" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    docLink: {
      type: String,
      required: false,
      default: ''
    },
    contributors: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    baseLink() {
      return '/' + this.$route.params.section
    },
    lastPathPart() {
      return this.$route.path.replace(/\/$/, '').split('/')[2] || ''
    }
  }
}
</script>
