<template>
  <div>
    <PageHero :title="page.title" />
    <div class="d-container">
      <BlogpostList />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  templateOptions: {
    aside: false,
    fluid: true
  }
})
</script>
