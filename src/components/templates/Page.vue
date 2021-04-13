<template>
  <AppContainer aside>
    <template #aside>
      <!-- todo: navigation instead -->
      <AppAside class="block lg:hidden" />
    </template>
    <AppPage>
      <PageContent :page="page" />
      <template #toc>
        <PageToc v-if="page.toc" :title="page.toc.title" :toc="page.toc.links" />
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
