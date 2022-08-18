<script setup lang="ts">
import { computed, useContent, useMenu, useTheme, watch } from '#imports'

const { navigation } = useContent()
const theme = useTheme()

const filtered = computed(() => theme.value?.aside?.filter || [])

const links = computed(() => {
  return (navigation.value || []).filter((item) => {
    if (filtered.value.includes(item._path)) { return false }
    return true
  })
})

const { visible, open, close } = useMenu()

watch(visible, v => (v ? open() : close()))
</script>

<template>
  <button class="relative z-10 u-text-gray-500 hover:u-text-gray-700 rounded-xl lg:hidden" aria-label="Menu" @click="open">
    <Icon name="heroicons-outline:menu" class="w-6 h-6 u-text-gray-500 hover:u-text-gray-700" aria-hidden="”true”" />
  </button>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-start overflow-y-auto bg-opacity-50 backdrop-blur dark:bg-opacity-50 lg:hidden" @click="close">
      <div class="w-full max-w-xs min-h-full px-4 pb-12 shadow u-bg-white sm:px-6" @click.stop>
        <div class="flex items-center justify-between gap-2 border-b border-transparent h-header">
          <button class="relative z-10 u-text-gray-500 hover:u-text-gray-700 rounded-xl" aria-label="Menu" @click="close">
            <Icon name="heroicons-outline:x" class="w-6 h-6 u-text-gray-500 hover:u-text-gray-700" aria-hidden="”true”" />
          </button>

          <div class="flex items-center gap-4">
            <SocialIcons />
            <ThemeSelect size="h-6 w-6" />
          </div>
        </div>

        <DocsAsideTree :links="links" />
      </div>
    </div>
  </teleport>
</template>
