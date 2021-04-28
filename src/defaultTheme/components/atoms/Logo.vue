<template>
  <div class="flex items-center flex-none lg:w-60 xl:w-72">
    <NuxtLink :to="localePath('/')" class="w-auto" :aria-label="settings.title">
      <HeaderLogo />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    settings: {
      type: Object as any,
      required: true
    }
  },
  setup(props) {
    const logo = computed(() => {
      if (!props.settings.logo) {
        return
      }

      if (typeof props.settings.logo === 'object') {
        return props.settings.logo
      }

      return {
        light: props.settings.logo,
        dark: props.settings.logo
      }
    })

    return {
      logo
    }
  }
})
</script>
