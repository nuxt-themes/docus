<script setup lang="ts">
const variants = {
  ghost: {
    true: {
      primary: 'bg-transparent text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800',
      secondary: 'bg-transparent text-secondary-500 hover:bg-secondary-100 dark:hover:bg-secondary-800',
      gray: 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
      orange: 'bg-transparent text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-800',
      purple: 'bg-transparent text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-800',
      green: 'bg-transparent text-green-500 hover:bg-green-100 dark:hover:bg-green-800',
      blue: 'bg-transparent text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800',
      yellow: 'bg-transparent text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-800',
      red: 'bg-transparent text-red-500 hover:bg-red-100 dark:hover:bg-red-800',
    },
    false: {
      primary: 'text-primary-500 bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700',
      secondary: 'text-secondary-500 bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700',
      gray: 'text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
      orange: 'text-orange-500 bg-orange-100 dark:bg-orange-800 hover:bg-orange-200 dark:hover:bg-orange-700',
      purple: 'text-purple-500 bg-purple-100 dark:bg-purple-800 hover:bg-purple-200 dark:hover:bg-purple-700',
      green: 'text-green-500 bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700',
      blue: 'text-blue-500 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700',
      yellow: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-700',
      red: 'text-red-500 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700',
    }
  },
  size: {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-4 py-2',
    xl: 'text-xl px-5 py-3',
  }
}

const props = defineProps({
  blank: {
    type: Boolean,
    required: false,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  href: {
    type: String,
    required: true,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  ghost: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})
</script>

<template>
  <NuxtLink
    :class="[variants.ghost[props.ghost][props.color], variants.size[props.size], props.ghost ? 'hover:shadow-light-up-sm' : 'shadow-light-up-sm']"
    class="button-link inline-flex items-center flex-none w-fit select-none focus:outline-none focus:shadow-outline-current font-semibold border-0 border-solid border-transparent rounded-2xs"
    :to="href"
    :target="blank ? '_blank' : undefined"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="me-2"
    />
    <ContentSlot
      :use="$slots.default"
      unwrap="p ul li"
    />
  </NuxtLink>
</template>
