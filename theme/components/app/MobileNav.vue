<script setup lang="ts">
import { computed, useDocus, useMenu, useUserAgent, watch } from '#imports'

const { navigation } = useDocus()

const tree = computed(() => {
  return navigation.value.filter(
    (item) => {
      if (item.slug === '/' || item.slug === '/templates')
        return false
      return true
    },
  )
})

const { visible, open, close, toggle, scrollBarGap } = useMenu()

const { isDesktopSafari, isDesktopFirefox } = useUserAgent()

watch(visible, v => (v ? open() : close()))

const buttonClasses = 'w-12 h-8 focus:outline-none bg-warmgray-50 hover:bg-warmgray-100 dark:bg-warmgray-800 rounded-xl'
</script>

<template>
  <div class="relative lg:hidden">
    <button :class="[buttonClasses]" class="z-10 relative" @click="toggle">
      <IconDots class="w-6 h-6 icon-base mx-auto" />
    </button>

    <ClientOnly>
      <teleport to="body">
        <!-- Scrim overlay -->
        <div
          id="mobile-nav-scrim"
          :class="[visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"
          class="fixed top-0 left-0 z-10 w-full h-full bg-warmgray-100 bg-opacity-50 dark:bg-warmgray-800 dark:bg-opacity-50 backdrop-blur transition"
          @click="toggle"
        />

        <!-- clone AppHeader button, due to stacking context limitations -->
        <button
          id="mobile-nav-button"
          :class="[
            buttonClasses,
            visible
              ? 'opacity-100 pointer-events-auto'
              : `opacity-0 transition ${
                isDesktopSafari || isDesktopFirefox ? 'duration-0' : 'duration-400'
              } pointer-events-none`
          ]"
          class="z-30 fixed"
          @click="toggle"
        >
          <IconLine class="w-6 h-6 icon-base mx-auto" />
        </button>

        <!-- Nav menu surface -->
        <div
          id="mobile-nav-surface"
          :class="[visible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none']"
          class="fixed z-20 w-[calc(100%-4rem)] sm:w-auto min-w-full sm:min-w-[calc(320px-2rem)] transform origin-top-right transition-transform ease-out"
          @click="toggle"
        >
          <div
            class="pl-8 pr-0 overflow-y-auto mb-2 surface pb-6 pt-12 rounded-2xl shadow-xl border-2 surface-border max-h-full z-40"
            @click.stop.prevent
          >
            <DocsAsideTree :tree="tree" />

            <div class="flex items-center justify-end px-6">
              <ThemeSelect class="block" />
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
  @apply top-4;
  right: calc(theme('spacing.4') + var(--scrollbar-gap));
}

@screen sm {
  #mobile-nav-surface {
    @apply right-4 top-[0.5rem] bottom-[0.5rem];
    max-height: calc(100vh- 1rem);
    min-width: 320px;
  }

  #mobile-nav-button {
    @apply top-4;
    right: calc(theme('spacing.6') + var(--scrollbar-gap));
  }
}
</style>
