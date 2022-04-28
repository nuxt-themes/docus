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
  () =>
    `top: 1rem; right: calc(1.5rem + ${isDesktopSafari.value || isDesktopFirefox.value ? scrollBarGap.value : 0}px);`,
)

const surfaceBodyLockHack = computed(
  () => `top: 1rem; right: calc(1rem + ${isDesktopSafari.value || isDesktopFirefox.value ? scrollBarGap.value : 0}px);`,
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
          class="xl:hidden fixed z-20 min-w-[calc(320px-2rem)] d-body-bg pb-6 pt-12 rounded-2xl shadow-xl border border-color transform origin-top-right transition-transform ease-out"
        >
          <div class="pl-8 pr-0 overflow-auto h-full mb-2">
            <DocsAsideTree :tree="tree" />
          </div>
          <div class="px-6">
            <ThemeSelect class="ml-auto block" />
          </div>
        </div>
      </teleport>
    </ClientOnly>
  </div>
</template>
