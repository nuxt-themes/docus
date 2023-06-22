<template>
  <button
    class="doc-search"
    type="button"
    aria-label="Search"
    v-bind="$attrs"
  >
    <span class="content">
      <Icon name="heroicons-outline:search" />
      <span>Search</span>
      <span>
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </span>
    </span>
  </button>
</template>

<style scoped lang="ts">
css({
  '.doc-search': {
    padding: '{space.2} {space.4}',
    '&:hover': {
      button: {
        borderColor: '{color.gray.300}'
      }
    },
    '.content': {
      borderRadius: '{radii.md}',
      display: 'flex',
      alignItems: 'center',
      color: '{elements.text.secondary.color.static}',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '{color.gray.100}',
      fontSize: '{fontSize.xs}',
      gap: '{space.2}',
      padding: '{space.rem.375}',
      '@dark': {
        borderColor: '{color.gray.900}',
      },
      '&:hover': {
        color: '{elements.text.secondary.color.hover}',
        borderColor: '{color.gray.400}',
        '@dark': {
          borderColor: '{color.gray.700}',
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
  }
})
</style>
