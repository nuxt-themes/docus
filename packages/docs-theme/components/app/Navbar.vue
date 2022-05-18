<script setup lang="ts">
import { onMounted, onUnmounted, ref, useDocus } from '#imports'

const { theme } = useDocus()

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
  <header class="sticky top-0 z-10 w-full surface surface-blurry h-header">
    <Container padded class="flex h-full lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="flex items-center flex-none transition-base text-secondary-hover lg:col-span-2 lg:flex-none">
        <NavbarLogo />
      </div>

      <div class="flex items-center flex-1 lg:col-span-8">
        <NavbarCenter class="hidden lg:flex" />
      </div>

      <div class="flex items-center justify-end flex-none lg:col-span-2 lg:gap-4 lg:pl-4">
        <MobileNav />
        <ThemeSelect size="h-5 w-5 hidden lg:block" />
        <SocialIcons size="h-5 w-5 hidden lg:block" />
      </div>
    </Container>
  </header>
</template>
