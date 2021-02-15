<template>
  <div v-if="link" class="flex flex-col sm:flex-row justify-between mt-10 mb-4">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="hover:underline font-medium flex items-center"
    >
      {{ $t('article.github') }}
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>

    <span class="text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center mt-4 sm:mt-0">
      {{ $t("article.updatedAt") }} {{ $d(Date.parse(document.updatedAt), "long") }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'settings',
      'repositoryUrl'
    ]),
    link () {
      if (!this.settings.github) {
        return
      }

      return [
        this.repositoryUrl,
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
