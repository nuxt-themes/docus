<template>
  <aside class="fixed z-50 lg:z-0 lg:static">
    <div class="h-full overflow-auto pointer-events-none lg:overflow-visible ">
      <!-- scrim -->
      <transition name="fade">
        <div
          v-if="$menu.open"
          @click.stop="menu = !menu"
          class="fixed top-0 left-0 z-0 w-full h-full bg-gray-400 pointer-events-auto scrim dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-80 lg:hidden"
        ></div>
      </transition>

      <!-- desktop aside -->
      <AsideNavigation class="hidden lg:block" />

      <!-- mobile aside -->
      <transition name="slide-from-left-to-left">
        <AsideNavigation v-if="$menu.open" />
      </transition>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    menu: {
      get() {
        return this.$menu.open;
      },
      set(val) {
        this.$menu.open = val;
      }
    }
  }
};
</script>

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
  transition: transform 200ms, opacity 200ms linear;
}
.slide-from-left-to-left-enter,
.slide-from-left-to-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.light .scrim {
  backdrop-filter: blur(8px);
  /* background: rgba(101, 108, 133, 0.8); */
}

.dark .scrim {
  backdrop-filter: blur(8px);
  /* background: rgba(9, 10, 17, 0.8); */
}
</style>
