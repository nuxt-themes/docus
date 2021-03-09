<template>
  <NuxtLink
    v-if="isInternal"
    :to="href"
    class="button-link"
    :class="size"
  ><slot /></NuxtLink>
  <a v-else :href="href" class="button-link" :class="size" v-bind="linkAttrs"><slot /><IconExternalLink v-if="blank" class="w-4 h-4 ml-2" /></a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: ''
    },
    blank: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    isInternal () {
      return this.href.startsWith('/') && this.href.startsWith('//') === false
    },
    linkAttrs () {
      if (this.blank) {
        return { rel: 'noopener', target: '_blank' }
      }
      return {}
    }
  }
}
</script>

<style lang="postcss">
a.button-link {
  @apply inline-flex items-center flex-none px-4 py-2.5 leading-4 text-base font-semibold text-white transition-colors duration-200 border border-transparent bg-primary-500 hover:bg-primary-600 rounded focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-600 focus:outline-none;
  &.large {
    @apply px-6 py-3 leading-6 text-lg rounded-md;
  }
}
</style>
