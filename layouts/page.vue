<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <Layout id="docus-page" class="flex flex-col min-h-screen">
    <Container :fluid="page.fluid" :constrained-class="page.constrainedClass" :padded="page.padded">
      <slot />
    </Container>
  </Layout>
</template>
