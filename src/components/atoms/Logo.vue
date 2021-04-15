<template>
  <div class="flex items-center flex-none lg:w-60 xl:w-72">
    <NuxtLink :to="localePath('/')" class="w-auto" :aria-label="settings.title">
      <HeaderLogo />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  computed: {
    logo() {
      if (!this.settings.logo) {
        return
      }
      if (typeof this.settings.logo === 'object') {
        return this.settings.logo
      }
      return {
        light: this.settings.logo,
        dark: this.settings.logo
      }
    }
  }
}
</script>
