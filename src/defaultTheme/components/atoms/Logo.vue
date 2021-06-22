<template>
  <div class="flex items-center flex-none lg:w-60">
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
      if (!props.settings.value.logo) {
        return
      }

      if (typeof props.settings.value.logo === 'object') {
        return props.settings.value.logo
      }

      return {
        light: props.settings.value.logo,
        dark: props.settings.value.logo
      }
    })

    return {
      logo
    }
  }
})
</script>
