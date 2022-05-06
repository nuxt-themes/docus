<script setup lang="ts">
import { computed, useDocus, useMenu, useUserAgent, watch } from '#imports'

const { navigation, theme } = useDocus()

const tree = computed(() => {
  return navigation.value.filter((item) => {
    if (item.slug === '/') return false
    return true
  })
})

const { visible, open, close, toggle } = useMenu()

const { isDesktopSafari, isDesktopFirefox } = useUserAgent()

watch(visible, (v) => (v ? open() : close()))

const buttonClasses = 'w-8 h-8 focus:outline-none icon-base rounded-xl'
</script>

<template>
  <div class="relative lg:hidden">
    <button :class="[buttonClasses]" class="relative z-10" @click="toggle">
      <Icon name="heroicons-outline:menu" class="icon-base mx-auto h-6 w-6" />
    </button>

    <ClientOnly>
      <teleport to="body">
        <!-- Scrim overlay -->
        <div
          id="mobile-nav-scrim"
          :class="[visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0']"
          class="fixed top-0 left-0 z-10 h-full w-full bg-opacity-50 backdrop-blur transition dark:bg-opacity-50"
          @click="toggle"
        />

        <!-- clone AppHeader button, due to stacking context limitations -->
        <button
          id="mobile-nav-button"
          :class="[
            buttonClasses,
            visible ? 'pointer-events-auto opacity-100' : `opacity-0 transition ${isDesktopSafari || isDesktopFirefox ? 'duration-0' : 'duration-400'} pointer-events-none`,
          ]"
          class="fixed z-30"
          @click="toggle"
        >
          <Icon name="heroicons-outline:minus" class="icon-base mx-auto h-6 w-6" />
        </button>

        <!-- Nav menu surface -->
        <div
          id="mobile-nav-surface"
          :class="[visible ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0']"
          class="fixed z-20 w-[calc(100%-4rem)] min-w-full origin-top-right transform transition-transform ease-out sm:w-auto sm:min-w-[calc(320px-2rem)]"
          @click="toggle"
        >
          <div class="surface surface-border z-40 mb-2 max-h-full overflow-y-auto rounded-2xl border-2 pl-8 pr-0 pb-6 pt-12 shadow-xl" @click.stop.prevent>
            <DocsAsideTree :tree="tree" />

            <div class="mt-4 flex items-center justify-end gap-4 px-6">
              <LastRelease v-if="theme?.github?.releases" class="mr-1.5" />
              <SocialIcons size="h-7 w-7" spacing="lg:mr-1.5" />
              <ThemeSelect size="h-7 w-7" spacing="lg:mr-1.5" />
            </div>
          </div>
        </div>
      </teleport>
    </ClientOnly>
  </div>
</template>

<style lang="postcss">
#mobile-nav-surface,
#mobile-nav-button,
#mobile-nav-scrim {
  @apply lg:hidden;
}

#mobile-nav-surface {
  @apply right-4 top-[0.5rem] bottom-[0.5rem];
  max-height: calc(100vh- 2rem);
  min-width: calc(100% - 2rem);
}

#mobile-nav-button {
  @apply top-3;
  right: calc(theme('spacing.4') + var(--scrollbar-gap));
}

@screen sm {
  #mobile-nav-surface {
    @apply right-4 top-[0.5rem] bottom-[0.5rem];
    max-height: calc(100vh- 1rem);
    min-width: 320px;
  }

  #mobile-nav-button {
    @apply top-5;
    right: calc(theme('spacing.6') + var(--scrollbar-gap));
  }
}
</style>
