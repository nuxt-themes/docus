<template>
  <h2><slot /></h2>
</template>

<style lang="postcss" scoped>
h2 {
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
    & code:before {
      background-color: theme('colors.gray.900');
    }
  }
}
</style>
