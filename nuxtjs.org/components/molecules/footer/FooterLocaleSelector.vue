<template>
  <NuxtSelectNative
    v-model="locale"
    :options="locales"
    select-class="appearance-none block w-full bg-none dark:bg-transparent light:bg-white border light:border-gray-200 dark:border-secondary-dark rounded-md py-2 pl-3 pr-10 text-base light:text-gray-500 dark:text-secondary-surface focus:outline-none light:focus:ring-black dark:focus:ring-white light:focus:border-gray-400 dark:focus:border-secondary-light sm:text-sm"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LocaleSelector',
  computed: {
    locale: {
      get() {
        return this.$i18n.localeProperties.code
      },
      set(newVal) {
        this.$router.push(this.switchLocalePath(newVal))
      }
    },
    locales() {
      return this.$i18n.locales.map(locale => ({
        value: locale.code,
        text: locale.name,
        disabled: false
      }))
    }
  }
})
</script>
