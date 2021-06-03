<template>
  <div class="relative">
    <AppContainer class="pt-20">
      <div class="flex flex-wrap items-center justify-between">
        <h1
          class="w-full text-3xl xl:text-4xl light:text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary text-center font-medium leading-normal -mb-6 z-10"
        >
          {{ $t('common.page_not_found') }}
        </h1>
        <div class="w-full lg:w-2/3 mx-auto">
          <LostImageIllustration class="w-full" />
        </div>
      </div>
    </AppContainer>
  </div>
</template>

<script>
import LostImageIllustration from '~/assets/illustrations/404.svg?inline'

export default {
  components: {
    LostImageIllustration
  },
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
