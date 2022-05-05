<script setup lang="ts">
import { onMounted, onUnmounted, ref } from '#imports'

const onTop = ref(true)

function setOnTop(): void {
  if (window.pageYOffset <= 0) onTop.value = true
  else onTop.value = false
}

onMounted(() => {
  setOnTop()
  document.addEventListener('scroll', setOnTop)
})

onUnmounted(() => document.removeEventListener('scroll', setOnTop))
</script>

<template>
  <header class="surface surface-blurry h-header sticky top-0 z-10 w-full border-b border-gray-200 border-opacity-50 dark:border-gray-800">
    <Container class="flex h-full flex-none">
      <div class="flex flex-1 items-center lg:flex-none">
        <NavbarLogo />
      </div>

      <div class="flex flex-1 items-center">
        <NavbarCenter />
      </div>

      <div class="flex flex-1 items-center justify-end lg:gap-4">
        <LastRelease class="mr-1.5 hidden lg:block" />
        <MobileNav class="flex lg:hidden" />
        <SocialIcons size="h-6 w-6 hidden lg:block" spacing="lg:mr-1.5" />
        <ThemeSelect size="h-6 w-6 hidden lg:block" spacing="lg:mr-1.5" />
      </div>
    </Container>
  </header>
</template>
