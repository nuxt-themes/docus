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
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()

    const layout = computed(() => $docus.layout.value)

    return {
      layout
    }
  }
})
</script>

<style lang="postcss">
:root {
  --header-height: theme('spacing.14');
  --docs-scroll-margin-block: calc(var(--header-height) + 4rem);
  --blogpost-scroll-margin-block: calc(var(--header-height));
}

@screen md {
  :root {
    --header-height: theme('spacing.18');
    --blogpost-scroll-margin-block: calc(var(--header-height) - 0.5rem);
  }
}

@screen xl {
  :root {
    --docs-scroll-margin-block: calc(var(--header-height) + 1rem);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-from-left-to-left-enter-active,
.slide-from-left-to-left-leave-active {
  transition: transform 200ms ease-out, opacity 200ms linear;
}
.slide-from-left-to-left-enter,
.slide-from-left-to-left-leave-to {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
</style>
