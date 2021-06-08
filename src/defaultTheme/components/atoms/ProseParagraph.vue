<template>
  <p><slot /></p>
</template>

<style lang="postcss" scoped>
p {
  @apply leading-relaxed my-4;
  >>> br {
    @apply block mt-4
    content: '';
  }
}
</style>
