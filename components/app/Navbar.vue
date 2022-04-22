<template>
  <header class="sticky w-full h-[4rem] top-0 z-50 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 border-b border-gray-200 dark:border-gray-800 border-opacity-50 sticky w-full top-0 z-50 backdrop-blur supports-backdrop-blur:bg-white/95">
    <Container class="flex flex-none h-full">
      <!-- <NavigationButton v-if="aside" /> -->

      <div class="justify-center flex items-center flex-1 lg:flex-none">
        <NavbarLogo />
      </div>

      <div class="items-center hidden lg:flex lg:flex-1">
        <!-- <HeaderNavigation /> -->
      </div>

      <!-- Desktop: Right section -->
      <div class="flex items-center justify-end lg:flex-none">
        <!-- <ColorSwitcher /> -->

        <div class="items-center justify-end hidden lg:flex">
          <!-- <LangSwitcher /> -->
          <ThemeSelect />
          <!-- <SocialIcons /> -->
        </div>
      </div>
    </Container>
  </header>
</template>
