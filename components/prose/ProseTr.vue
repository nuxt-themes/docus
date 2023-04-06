<template>
  <tr>
    <slot />
  </tr>
</template>

<style lang="ts" scoped>
css({
  'tbody tr': {
    borderBottomWidth: '{prose.tbody.tr.borderBottom.width}',
    borderBottomStyle: '{prose.tbody.tr.borderBottom.style}',
    borderBottomColor: '{prose.tbody.tr.borderBottom.color}',
  }
})
</style>
