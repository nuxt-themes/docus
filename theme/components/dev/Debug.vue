<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { watchDebounced } from '@vueuse/core'
import type { ThemeDebugConfig } from '../../utils/theme'
import { computed, useDocus } from '#imports'

const { page, navigation, theme } = useDocus()

const defaultConfig: ThemeDebugConfig = {
  page: true,
  navigation: true,
  theme: true,
}

const config = computed(() => {
  const _config = theme.value?.debug

  if (typeof _config === 'object') return Object.assign(defaultConfig, _config)

  if (_config === true) return defaultConfig

  if (_config === false) return _config
})

const icons = {
  page: '📃',
  navigation: '🔖',
  theme: '🎨',
}

Object.entries({
  page,
  navigation,
  theme,
}).forEach(([key, reference]) => {
  if (!config.value || !config.value?.[key]) return

  watchDebounced(
    reference,
    () => {
      if (key === 'page')
        // eslint-disable-next-line no-console
        console.log(`[${icons[key]}] Page updates detected! ${`(${(reference.value as ParsedContent)?.title})` || `(${(reference.value as ParsedContent)?.id})` || ''}`)
      // eslint-disable-next-line no-console
      else console.log(`[${icons[key]}] ${key[0].toUpperCase() + key.slice(1, key.length)} updates detected!`)

      // eslint-disable-next-line no-console
      console.dir({ ...reference.value })
    },
    {
      debounce: 100,
    },
  )
})
</script>

<template>
  <div class="hidden" />
</template>
