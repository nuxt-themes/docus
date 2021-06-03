<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="no-underline inline-block font-medium text-sm px-4 py-2 shadow uppercase rounded hover:shadow-md"
    :class="variant"
  >
    <div
      v-if="$slots.icon"
      class="inline-block fill-current stroke-current mr-1"
    >
      <slot name="icon" />
    </div>
    <slot />
  </NuxtLink>
  <a
    v-else
    :href="href"
    target="_blank"
    rel="noopener"
    class="no-underline inline-block font-medium text-sm px-4 py-2 shadow uppercase rounded hover:shadow-md"
    :class="variant"
  >
    <div
      v-if="$slots.icon"
      class="inline-block fill-current stroke-current mr-1"
    >
      <slot name="icon" />
    </div>
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    href: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss" scoped>
.primary {
  @apply bg-primary-base text-white;

  &:hover {
    @apply bg-primary-light;
  }
}

.secondary {
  @apply bg-gray-200 text-nuxt-gray;

  &:hover {
    @apply bg-gray-300;
  }
}
</style>
