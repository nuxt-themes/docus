<script setup lang="ts">
import { onMounted, onUnmounted, ref } from '#imports'
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
</script>

<template>
  <header class="h-header sticky top-0 z-10 w-full border-b border-gray-100 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
    <Container padded class="flex h-full lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="text-secondary-hover flex flex-none items-center lg:col-span-2 lg:flex-none">
        <NavbarLogo />
      </div>

      <div class="flex flex-1 items-center lg:col-span-8">
        <NavbarCenter class="hidden lg:flex" />
      </div>

      <div class="flex flex-none items-center justify-end lg:col-span-2 lg:gap-4 lg:pl-4">
        <MobileNav />
        <ThemeSelect size="h-5 w-5 hidden lg:block" />
        <SocialIcons size="h-5 w-5 hidden lg:block" />
      </div>
    </Container>
  </header>
</template>
