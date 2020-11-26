<template>
  <div v-if="link" class="flex mt-10 mb-4">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="text-gray-500 hover:underline font-medium flex items-center"
    >
      {{ $t('article.github') }}
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>
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
      'githubUrls',
      'lastRelease'
    ]),
    link () {
      if (!this.settings.github) {
        return
      }

      return [
        this.githubUrls.repo,
        'edit',
        this.settings.defaultBranch,
        this.settings.defaultDir,
        `content${this.document.path}${this.document.extension}`
      ].filter(path => !!path).join('/')
    }
  }
}
</script>
