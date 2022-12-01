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
        borderColor: '{color.gray.300}'
      }
    },
    button: {
      borderRadius: '{radii.md}',
      display: 'flex',
      alignItems: 'center',
      fontSize: '{fontSize.sm}',
      color: '{color.gray.500}',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '{color.gray.100}',
      fontSize: '{fontSize.xs}',
      gap: '{space.2}',
      padding: '{space.1-5}',
      '@dark': {
        color: '{color.gray.400}',
        borderColor: '{color.gray.900}',
      },
      '&:hover': {
        color: '{color.gray.700}',
        borderColor: '{color.gray.400}',
        '@dark': {
          color: '{color.gray.200}',
          borderColor: '{color.gray.700}',
        }
      }
    },
    span: {
      '&:first-child': {
        // hidden text-xs font-medium lg:block
        display: 'none',
        fontSize: '{fontSize.xs}',
        fontWeight: '{fontWeight.medium}',
        '@lg': {
          display: 'block'
        }
      },
      '&:nth-child(2)': {
        flex: 'none',
        display: 'none',
        fontSize: '{fontSize.xs}',
        fontWeight: '{fontWeight.semibold}',
        '@lg': {
          display: 'block'
        }
      }
    }
  }
})
</style>
