<template>
  <td>
    <slot />
  </td>
</template>

<style lang="ts" scoped>
css({
  "tbody td": {
    fontFamily: '{typography.font.body}',
    padding: '{prose.tbody.td.padding}',
    "&:first-child": { paddingInlineStart: "0" },
    "&:last-child": { paddingInlineEnd: "0" },
  }
})
</style>
