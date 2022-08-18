<script setup lang="ts">
const { hasDocSearch } = useDocSearch()
</script>

<template>
  <header class="sticky top-0 z-10 w-full border-b h-header u-border-gray-100 bg-white/95 backdrop-blur dark:bg-black/95">
    <AppContainer padded class="grid h-full grid-cols-12 lg:gap-8">
      <div class="flex items-center flex-none col-span-2 lg:flex-none">
        <NavbarDialog />
        <NavbarLogo class="hidden lg:block" />
      </div>

      <div class="flex items-center justify-center flex-1 col-span-8">
        <NavbarLogo class="lg:hidden" />
        <NavbarCenter class="hidden lg:flex" />
      </div>

      <div class="flex items-center justify-end flex-none col-span-2 lg:gap-4 lg:pl-4">
        <AppSearch v-if="hasDocSearch" />
        <ThemeSelect :size="`h-5 w-5 ${hasDocSearch ? 'hidden lg:block' : ''}`" />
        <SocialIcons size="h-5 w-5 hidden lg:block" />
      </div>
    </AppContainer>
  </header>
</template>
