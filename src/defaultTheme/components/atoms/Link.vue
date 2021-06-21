<template>
  <NuxtLink v-if="isInternal" :to="to">
    <slot />
    <slot name="nuxt-link" />
  </NuxtLink>

  <a v-else :href="to" v-bind="linkAttrs">
    <slot />
    <slot name="href" />
  </a>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    },
    blank: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props) {
    const isInternal = computed(() => props.to.startsWith('/') && props.to.startsWith('//') === false)

    const linkAttrs = computed(() => (props.blank ? { rel: 'noopener nofollow', target: '_blank' } : {}))

    return {
      isInternal,
      linkAttrs
    }
  }
})
</script>
