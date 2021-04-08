<template>
  <AppContainer aside>
    <template #aside>
      <!-- todo: navigation instead -->
      <AppAside class="block lg:hidden" />
    </template>
    <AppPage>
      <PageContent :page="page" />
      <template #toc>
        <PageToc v-if="page.toc" :title="page.tocTitle" :toc="page.toc" />
      </template>
    </AppPage>
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
