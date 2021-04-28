<template>
  <AppContainer aside>
    <template #aside>
      <!-- TODO: navigation instead -->
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
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  }
})
</script>
