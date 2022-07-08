<script setup lang="ts">
import { computed, useDocus, useMenu, watch } from '#imports'

const { navigation, theme } = useDocus()

const filtered = computed(() => theme.value?.aside?.filter || [])

const links = computed(() => {
  return (navigation.value || []).filter((item) => {
    if (filtered.value.includes(item._path)) return false
    return true
  })
})

const { visible, open, close } = useMenu()

watch(visible, (v) => (v ? open() : close()))
</script>

<template>
  <button class="u-text-gray-500 hover:u-text-gray-700 relative z-10 rounded-xl lg:hidden" aria-label="Menu" @click="open">
    <Icon name="heroicons-outline:menu" class="u-text-gray-500 hover:u-text-gray-700 h-6 w-6" aria-hidden="”true”" />
  </button>

  <teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-start overflow-y-auto bg-opacity-50 backdrop-blur dark:bg-opacity-50 lg:hidden" @click="close">
      <div class="u-bg-white min-h-full w-full max-w-xs px-4 pb-12 shadow sm:px-6" @click.stop>
        <div class="h-header flex items-center justify-between gap-2 border-b border-transparent">
          <button class="u-text-gray-500 hover:u-text-gray-700 relative z-10 rounded-xl" aria-label="Menu" @click="close">
            <Icon name="heroicons-outline:x" class="u-text-gray-500 hover:u-text-gray-700 h-6 w-6" aria-hidden="”true”" />
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
