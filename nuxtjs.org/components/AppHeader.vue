<template>
  <header class="d-header">
    <div class="flex flex-none h-full d-container-content">
      <NavigationButton v-if="aside" />

      <div :class="[aside ? 'justify-center' : 'justify-start']" class="flex items-center flex-1 lg:flex-none">
        <Logo :settings="settings" />
      </div>

      <div class="items-center hidden lg:flex lg:flex-1">
        <HeaderNavigation />
      </div>

      <div class="flex items-center justify-end lg:flex-none lg:w-60">
        <AlgoliaSearchBox
          v-if="settings.algolia"
          :options="settings.algolia"
          :settings="settings"
          class="w-14 lg:px-2 ml-auto"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    aside: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { $docus } = useContext()

    const settings = computed(() => $docus.settings.value)

    const lastRelease = computed(() => $docus.lastRelease?.value)

    return {
      settings,
      lastRelease
    }
  }
})
</script>
