<template>
  <div>
    <template v-if="settings.header.title && !settings.header.logo">
      {{ settings.title }}
    </template>
    <template v-else-if="settings.header.title && settings.header.logo">
      <div class="flex items-center">
        <span class="mr-4">
          <img
            :src="logo.light"
            class="w-auto h-8 light-img"
            :alt="settings.title"
          />
          <img
            :src="logo.dark"
            class="w-auto h-8 dark-img"
            :alt="settings.title"
          />
        </span>
        <span class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {{ settings.title }}
        </span>
      </div>
    </template>
    <template v-else-if="!settings.header.title && settings.header.logo">
      <img
        :src="logo.light"
        class="w-auto h-8 light-img"
        :alt="settings.title"
      />
      <img
        :src="logo.dark"
        class="w-auto h-8 dark-img"
        :alt="settings.title"
      />
    </template>
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
    logo () {
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
