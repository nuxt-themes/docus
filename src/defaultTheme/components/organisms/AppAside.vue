<template>
  <aside class="fixed z-50 lg:z-0 lg:static">
    <div class="h-full overflow-auto pointer-events-none lg:overflow-visible">
      <!-- scrim -->
      <Transition name="fade">
        <div
          v-if="$menu.visible.value"
          class="
            fixed
            top-0
            left-0
            z-0
            w-full
            h-full
            bg-gray-400
            pointer-events-auto
            blur-8
            dark:bg-gray-900 dark:bg-opacity-80
            bg-opacity-80
            lg:hidden
          "
          @click.stop="$menu.toggle"
        />
      </Transition>

      <!-- desktop aside -->
      <AsideNavigation class="hidden lg:block" />

      <!-- mobile aside -->
      <Transition name="slide-from-left-to-left">
        <AsideNavigation v-show="$menu.visible.value" />
      </Transition>
    </div>
  </aside>
</template>

<style scoped>
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
