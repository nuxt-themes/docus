<template>
  <h2><slot /></h2>
</template>

<style lang="postcss" scoped>
h2 {
  /* scroll-margin-block: var(--docs-scroll-margin-block); */
  color: theme('colors.gray.900');
  letter-spacing: theme('letterSpacing.tight');
  font-size: 1.5em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.3333333;
  font-weight: theme('fontWeight.bold');

  & a {
    color: inherit;
    font-weight: inherit;
    position: relative;
    & code {
      border: '1px dashed transparent';
      position: relative;
      z-index: 0;
    }
    &:hover {
      border-bottom-width: 0px;
      padding-bottom: 0px;
      & code {
        border-color: theme('colors.gray.500');
      }
    }
    &::after {
      content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23111827"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /%3E%3C/svg%3E');
      @apply absolute w-5 h-5 pl-2 opacity-0;
    }
    &:hover {
      &::after {
        @apply opacity-100;
      }
    }
    &:before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: calc(100% + 4px);
    }
    &:hover:before {
      border-bottom-width: 1px;
      border-style: dashed;
      border-bottom-color: theme('colors.gray.900');
    }
    & code:before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      z-index: -1;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      background-color: theme('colors.white');
      pointer-events: none;
    }
  }

  & code {
    font-size: 0.875em;
    color: inherit;
    font-weight: inherit;
    pointer-events: none;
  }
}

h2 + * {
  margin-top: 0;
}

.dark h2 {
  color: theme('colors.gray.100');
  & code {
    color: inherit;
    font-weight: inherit;
  }
  & a {
    color: inherit;
    font-weight: inherit;
    &:hover {
      code {
        border-color: theme('colors.gray.500');
      }
      &:before {
        border-bottom-color: theme('colors.gray.100');
      }
    }
    &::after {
      content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /%3E%3C/svg%3E');
    }
    & code:before {
      background-color: theme('colors.gray.900');
    }
  }
}
</style>
