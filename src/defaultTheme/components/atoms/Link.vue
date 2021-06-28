<template>
  <NuxtLink v-if="isInternal" :to="$contentLocalePath(to)">
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
      default: false
    },
    /**
     * `true` if `href` points to a static file
     */
    static: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isInternal = computed(() => !props.static && props.to.startsWith('/') && props.to.startsWith('//') === false)

    const linkAttrs = computed(() => ({
      rel: isInternal.value ? undefined : 'noopener nofollow noreferrer',
      target: blank ? '_blank' : undefined
    }))

    return {
      isInternal,
      linkAttrs
    }
  }
})
</script>
