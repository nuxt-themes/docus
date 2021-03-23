<template>
  <AppContainer fluid aside>
    <template #aside>
      <AppAside class="block lg:hidden" />
    </template>
    <slot />
  </AppContainer>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>
