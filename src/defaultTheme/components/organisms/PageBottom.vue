<template>
  <div v-if="link" class="flex flex-col justify-between text-gray-500 dark:text-gray-500 mt-8 mb-4 sm:flex-row">
    <a :href="link" target="_blank" rel="noopener" class="flex items-center mb-2 text-sm sm:mb-0 hover:underline">
      <IconEdit class="w-3 h-3 mr-1" />
      <span>
        {{ $t('article.github') }}
      </span>
    </a>

    <span class="flex items-center text-sm">
      {{ $t('article.updatedAt') }} {{ $d(Date.parse(page.updatedAt), 'long') }}
    </span>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { $docus, $config } = useContext()

    const { value: settings } = computed(() => $docus.settings)

    const link = computed(() => {
      if (!settings.value.github) return

      return [
        $docus.repoUrl.value,
        'edit',
        settings.value.github.branch,
        settings.value.github.dir || $config.contentDir,
        `${props.page.path}${props.page.extension}`.replace(/^\//g, '')
      ]
        .filter(Boolean)
        .join('/')
    })

    return {
      link
    }
  }
})
</script>
