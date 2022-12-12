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
        display: 'block',
        fontSize: '{fontSize.xs}',
        fontWeight: '{fontWeight.medium}',
      },
      '&:nth-child(2)': {
        flex: 'none',
        display: 'none',
        fontSize: '{fontSize.xs}',
        fontWeight: '{fontWeight.semibold}',
        '@sm': {
          display: 'block'
        }
      }
    }
  }
})
</style>
