<template>
  <div class="flex items-center flex-none lg:w-60">
    <NuxtLink :to="localePath('/')" class="w-auto" :aria-label="settings.title">
      <!-- Only title -->
      <span v-if="!hasLogo && hasTitle" class="d-header-title">
        {{ settings.title }}
      </span>
      <!-- Title and Logo -->
      <template v-else-if="hasLogo && hasTitle">
        <Logo class="d-logo" />
        <span class="d-header-title-logo">
          {{ settings.title }}
        </span>
      </template>
      <!-- Only Logo -->
      <Logo v-else-if="hasLogo" class="d-logo" />
      <!-- placeholder -->
      <ProseCodeInline v-else>No header.logo</ProseCodeInline>
    </NuxtLink>
  </div>
</template>

<script>
import Vue from 'vue'
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const hasLogo = computed(() => $docus.theme.value.header.logo)
    const hasTitle = computed(() => $docus.theme.value.header.title)

    return {
      hasLogo,
      hasTitle,
      settings: $docus.settings
    }
  }
})
</script>
