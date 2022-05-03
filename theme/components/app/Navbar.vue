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
    <Container class="grid h-full grid-cols-12 items-center">
      <div class="transition-base text-secondary-hover col-span-6 lg:col-span-3">
        <NavbarLogo />
      </div>

      <div class="hidden lg:col-span-6 lg:block">
        <!-- <HeaderNavigation /> -->
      </div>

      <div class="col-span-6 flex justify-end lg:col-span-3">
        <MobileNav class="flex lg:hidden" />
        <ThemeSelect class="hidden lg:block" />
      </div>
    </Container>
  </header>
</template>
