<template>
  <div class="w-full">
    <slot v-if="layout.header" name="header">
      <AppHeader :aside="layout.aside" />
    </slot>

    <div class="lg:flex" :class="layout.fluid ? '' : 'd-container'">
      <slot v-if="layout.aside" name="aside">
        <AppAside :class="layout.asideClass" />
      </slot>

      <div class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
        <slot />
      </div>
    </div>

    <slot v-if="layout.footer" name="footer"><AppFooter /></slot>

    <PoweredByDocus v-if="$docus.settings.credits" />
  </div>
</template>

<script>
import { defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()

    const layout = ref({
      ...$docus.layout.value
    })

    watch(
      $docus.layout,
      newVal => {
        layout.value = newVal
      },
      {
        immediate: true,
        deep: true
      }
    )

    return {
      layout
    }
  }
})
</script>
