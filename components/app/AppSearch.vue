<script setup lang="ts">
const { element } = useDocSearch()

const onClick = () => element.value.querySelector('button').click()
</script>

<template>
  <div class="doc-search" @click="onClick">
    <button
      type="button"
      aria-label="Search"
    >
      <Icon name="heroicons-outline:search" />
      <span>Search</span>
      <span>
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </span>
    </button>
  </div>
</template>

<style scoped lang="ts">
css({
  '.doc-search': {
    '&:hover': {
      button: {
        borderColor: '{colors.gray.300}'
      }
    },
    button: {
      borderRadius: '{radii.md}',
      display: 'flex',
      alignItems: 'center',
      fontSize: '{fontSizes.sm}',
      color: '{colors.gray.500}',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '{colors.gray.100}',
      fontSize: '{fontSizes.xs}',
      gap: '{space.2}',
      padding: '{space.1-5}',
      '@dark': {
        color: '{colors.gray.400}',
        borderColor: '{colors.gray.900}',
      },
      '&:hover': {
        color: '{colors.gray.700}',
        borderColor: '{colors.gray.400}',
        '@dark': {
          color: '{colors.gray.200}',
          borderColor: '{colors.gray.700}',
        }
      }
    },
    span: {
      '&:first-child': {
        // hidden text-xs font-medium lg:block
        display: 'none',
        fontSize: '{fontSizes.xs}',
        fontWeight: '{fontWeights.medium}',
        '@mq.lg': {
          display: 'block'
        }
      },
      '&:nth-child(2)': {
        flex: 'none',
        display: 'none',
        fontSize: '{fontSizes.xs}',
        fontWeight: '{fontWeights.semibold}',
        '@mq.lg': {
          display: 'block'
        }
      }
    }
  }
})
</style>
