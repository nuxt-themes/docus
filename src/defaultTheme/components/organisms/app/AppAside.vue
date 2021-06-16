<template>
  <aside class="fixed z-50 lg:z-0 lg:static">
    <div class="h-full overflow-auto pointer-events-none lg:overflow-visible">
      <!-- scrim -->
      <Transition name="fade">
        <div
          v-if="$menu.visible.value"
          class="fixed top-0 left-0 z-0 w-full h-full pointer-events-auto d-blur-header d-bg-header lg:hidden"
          @click.stop="$menu.toggle"
        />
      </Transition>

      <!-- Desktop aside -->
      <AsideNavigation class="hidden lg:block" />

      <!-- Mobile aside -->
      <Transition name="slide-from-left-to-left">
        <AsideNavigation v-show="$menu.visible.value" />
      </Transition>
    </div>
  </aside>
</template>
