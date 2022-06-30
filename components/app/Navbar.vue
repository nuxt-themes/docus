<script setup lang="ts">
import { onMounted, onUnmounted, ref, useDocSearch } from '#imports'

const onTop = ref(true)

function setOnTop(): void {
  if (window.pageYOffset <= 0) {
    onTop.value = true
  } else {
    onTop.value = false
  }
}

onMounted(() => {
  setOnTop()
  document.addEventListener('scroll', setOnTop)
})

onUnmounted(() => document.removeEventListener('scroll', setOnTop))

const { hasDocSearch } = useDocSearch()
</script>

<template>
  <header class="h-header u-border-gray-100 sticky top-0 z-10 w-full border-b bg-white/95 backdrop-blur dark:bg-black/95">
    <Container padded class="h-full grid grid-cols-12 lg:gap-8">
      <div class="flex flex-none items-center col-span-2 lg:flex-none">
        <NavbarDialog />
        <NavbarLogo class="hidden lg:block" />
      </div>

      <div class="flex flex-1 justify-center items-center col-span-8">
        <NavbarLogo class="lg:hidden" />
        <NavbarCenter class="hidden lg:flex" />
      </div>

      <div class="flex flex-none items-center justify-end col-span-2 lg:gap-4 lg:pl-4">
        <Search v-if="hasDocSearch" />
        <ThemeSelect :size="`h-5 w-5 ${hasDocSearch ? 'hidden lg:block' : ''}`" />
        <SocialIcons size="h-5 w-5 hidden lg:block" />
      </div>
    </Container>
  </header>
</template>
