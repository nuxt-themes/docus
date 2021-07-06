<template>
  <img v-if="singleLogo" :src="logo" :alt="settings.title" />
  <span v-else>
    <img :src="logo.light" class="d-logo light-img" :alt="settings.title" />
    <img :src="logo.dark" class="d-logo dark-img" :alt="settings.title" />
  </span>
</template>

<script>
import Vue from 'vue'
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus, $img } = useContext()
    const _logo = $docus.theme.value.header.logo
    const singleLogo = typeof _logo === 'string'
    const isSVG = value => value.endsWith('.svg')

    const logo = computed(() => {
      if (singleLogo) return isSVG(_logo) ? _logo : $img(_logo)

      return {
        light: isSVG(_logo.light) ? _logo.light : $img(_logo.light),
        dark: isSVG(_logo.dark) ? _logo.dark : $img(_logo.dark)
      }
    })

    return {
      singleLogo,
      logo,
      settings: $docus.settings
    }
  }
})
</script>
