<template>
  <div v-if="link" class="flex flex-col justify-between mt-10 mb-4 sm:flex-row">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="flex items-center font-medium hover:underline"
    >
      {{ $t('article.github') }}
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>

    <span class="flex items-center mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 sm:mt-0">
      {{ $t("article.updatedAt") }} {{ $d(Date.parse(document.updatedAt), "long") }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    settings () {
      return this.$docus.settings
    },
    link () {
      if (!this.settings.github) {
        return
      }

      return [
        this.$docus.repoUrl,
        'edit',
        this.settings.github.branch,
        this.settings.github.dir,
        'content',
        `${this.document.path}${this.document.extension}`.replace(/^\//g, '')
      ].filter(Boolean).join('/')
    }
  }
}
</script>
