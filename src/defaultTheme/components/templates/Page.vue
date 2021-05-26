<template>
  <AppTemplate aside>
    <template #aside>
      <!-- TODO: navigation instead -->
      <AppAside class="block lg:hidden" />
    </template>

    <AppPage>
      <PageContent :page="page" />

      <template #toc>
        <PageToc v-if="page.toc" :title="page.toc.title" :toc="page.toc.links" />
      </template>
    </AppPage>
  </AppTemplate>
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
