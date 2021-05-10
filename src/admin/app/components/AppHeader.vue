<template>
  <header class="relative z-10 flex items-center border-b">
    <AppHeaderLogo />

    <AppHeaderNav />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue3'
import AppHeaderLogo from './AppHeaderLogo.vue'
import AppHeaderNav from './AppHeaderNav.vue'

export default defineComponent({
  components: {
    AppHeaderLogo,
    AppHeaderNav
  }
})
</script>
