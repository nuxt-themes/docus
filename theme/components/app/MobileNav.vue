<script setup lang="ts">
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

const { scrollBarGap, visible, open, close, toggle } = useMenu()

const { isDesktopSafari, isDesktopFirefox } = useUserAgent()

const buttonStyles = 'w-12 h-8 focus:outline-none bg-warmgray-50 hover:bg-warmgray-100 dark:bg-warmgray-800 rounded-xl'

watch(visible, v => (v ? open() : close()))

// Necessary because of body lock layout shift
const buttonBodyLockHack = computed(
  () => `top: 1rem; right: calc(1.5rem + ${isDesktopSafari.value || isDesktopFirefox.value ? scrollBarGap.value : 0}px);`,
)

const surfaceBodyLockHack = computed(
  () => `top: 0.5rem; right: calc(1rem + ${isDesktopSafari.value || isDesktopFirefox.value ? scrollBarGap.value : 0}px); bottom: 0.5rem; max-height: calc(100vh- 2rem); min-width: calc(320px - 2rem);`,
)
</script>

<template>
  <div class="relative">
    <button :class="[buttonStyles]" class="z-10 relative" @click="toggle">
      <IconDots class="w-6 h-6 icon-base h-full mx-auto" />
    </button>

    <ClientOnly>
      <teleport to="body">
        <!-- Scrim overlay -->
        <div
          :class="[visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"
          class="xl:hidden fixed top-0 left-0 z-10 w-full h-full bg-warmgray-100 bg-opacity-50 dark:bg-warmgray-800 dark:bg-opacity-50 backdrop-blur transition"
          @click="toggle"
        />

        <!-- clone AppHeader button, due to stacking context limitations -->
        <button
          :style="buttonBodyLockHack"
          :class="[
            buttonStyles,
            visible
              ? 'opacity-100 pointer-events-auto'
              : `opacity-0 transition ${
                isDesktopSafari || isDesktopFirefox ? 'duration-0' : 'duration-400'
              } pointer-events-none`
          ]"
          class="xl:hidden z-30 fixed"
          @click="toggle"
        >
          <IconLine class="w-6 h-6 icon-base h-full mx-auto" />
        </button>

        <!-- Nav menu surface -->
        <div
          :style="surfaceBodyLockHack"
          :class="[visible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none']"
          class="fixed z-20 w-[calc(100%-3rem)] md:w-auto min-w-full md:min-w-[calc(320px-2rem)] transform origin-top-right transition-transform ease-out"
        >
          <div
            class="lg:hidden pl-8 pr-0 overflow-y-auto mb-2 surface pb-6 pt-12 rounded-2xl shadow-xl border-2 surface-border max-h-full"
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
