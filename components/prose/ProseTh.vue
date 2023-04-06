<template>
  <th>
    <slot />
  </th>
</template>

<style lang="ts" scoped>
css({
  th: {
    fontFamily: '{typography.font.display}',
    color: '{prose.th.color}',
    padding: '{prose.th.padding}',
    fontWeight: '{prose.th.fontWeight}',
    textAlign: '{prose.th.textAlign}',
    "&:first-child": { paddingInlineStart: "0" },
    "&:last-child": { paddingInlineEnd: "0" },
  }
})
</style>
