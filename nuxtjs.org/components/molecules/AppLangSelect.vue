<template>
  <div
    class="
      inline-block
      transition-colors
      duration-300
      ease-linear
      bg-gray-200
      rounded-full
      nui-select
      text-nuxt-gray
      dark:bg-dark-surface
      dark:text-dark-onSurfaceSecondary
    "
  >
    <div class="flex items-center content-center px-4">
      <div class="-mr-4">
        <slot name="icon" />
      </div>
      <select
        :value="$i18n.locale"
        class="
          z-10
          h-10
          pl-6
          pr-8
          font-medium
          bg-transparent
          appearance-none
          cursor-pointer
          focus:outline-none
        "
        :aria-label="label"
        @change="onChange"
      >
        <option
          v-for="(locale, i) in $i18n.locales"
          :key="i"
          :value="locale.code"
          class="dark:text-dark-surface"
        >
          {{ getLocaleDescription(locale) }}
        </option>
      </select>
      <SvgIcon name="caret-down" width="14" height="8" class="-ml-4" />
    </div>
  </div>
</template>

<script>
const Modes = Object.freeze({
  SLIM: 'slim',
  NORMAL: 'normal'
})

export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: Modes.NORMAL
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange(event) {
      const locale = this.$i18n.locales.find(
        locale => locale.code === event.target.value
      )

      window.location.href = locale.domain
    },
    getLocaleDescription(locale) {
      switch (this.mode) {
        case Modes.SLIM:
          return locale.code.toLocaleUpperCase()
        case Modes.NORMAL:
        default:
          return locale.name
      }
    }
  }
}
</script>
