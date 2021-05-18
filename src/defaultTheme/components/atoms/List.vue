<template>
  <div>
    <div v-for="(item, i) in listItems" :key="i" class="mt-3 flex items-center">
      <span :class="`list-${type}`" class="mt-px mr-3 flex-shrink-0">
        <Component :is="iconName" class="h-6 w-6" />
      </span>
      <span>
        <Markdown :node="item" />
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

import { flatUnwrap, Markdown } from '~docus/utils'

export default {
  components: { Markdown },
  props: {
    /**
     * Array of string
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Used to override the default <code>type</code> icon, check out the
     *  <a href="https://github.com/nuxt/content/tree/dev/packages/theme-docs/src/components/global/icons">icons available</a>
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * Type of list
     */
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'info', 'success', 'warning', 'danger'].includes(value)
      }
    }
  },
  setup(props) {
    const iconName = computed(
      () =>
        props.icon ||
        {
          primary: 'IconBadgeCheck',
          info: 'IconInformationCircle',
          success: 'IconCheckCircle',
          warning: 'IconExclamationCircle',
          danger: 'IconXCircle'
        }[props.type]
    )

    return {
      iconName
    }
  },
  computed: {
    listItems() {
      const defaultSlot = this.$slots.default || []
      if (!defaultSlot) {
        return this.items
      }
      return flatUnwrap(defaultSlot, ['p', 'ul', 'li'])
    }
  }
}
</script>

<style lang="postcss">
/* Primary */
.list-primary {
  @apply text-primary;
}

/* Info */
.list-info {
  @apply text-blue-500 dark:text-blue-400;
}

/* Success */
.list-success {
  @apply text-green-500 dark:text-green-400;
}

/* Warning */
.list-warning {
  @apply text-yellow-500 dark:text-yellow-400;
}

/* Danger */
.list-danger {
  @apply text-red-500 dark:text-red-400;
}
</style>
