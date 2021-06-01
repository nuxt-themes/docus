<template>
  <aside :class="['fixed z-50 lg:z-0 lg:static', $docus.layout.asideClass]">
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

      <!-- Desktop aside -->
      <AsideNavigation class="hidden lg:block" />

      <!-- Mobile aside -->
      <Transition name="slide-from-left-to-left">
        <AsideNavigation v-show="$menu.visible.value" />
      </Transition>
    </div>
  </aside>
</template>
