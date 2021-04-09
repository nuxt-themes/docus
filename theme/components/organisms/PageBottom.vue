<template>
  <div v-if="link" class="flex flex-col justify-between mt-8 mb-4 sm:flex-row">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="flex items-center mb-2 text-sm sm:mb-0 font-base hover:underline dark:text-gray-400"
    >
      <IconEdit class="w-3 h-3 mr-1" />
      <span>
        {{ $t('article.github') }}
      </span>
    </a>

    <span class="flex items-center text-sm text-gray-500 font-base dark:text-gray-400">
      {{ $t('article.updatedAt') }} {{ $d(Date.parse(page.updatedAt), 'long') }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  computed: {
    settings() {
      return this.$docus.settings
    },
    link() {
      if (!this.settings.github) {
        return
      }

      return [
        this.$docus.repoUrl,
        'edit',
        this.settings.github.branch,
        this.settings.github.dir,
        this.$config.contentDir,
        `${this.page.path}${this.page.extension}`.replace(/^\//g, '')
      ]
        .filter(Boolean)
        .join('/')
    }
  }
}
</script>
