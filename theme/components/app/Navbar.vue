<script setup lang="ts">
import { onMounted, onUnmounted, ref } from '#imports'

const onTop = ref(true)

function setOnTop(): void {
  if (window.pageYOffset <= 0)
    onTop.value = true
  else onTop.value = false
}

onMounted(() => {
  setOnTop()
  document.addEventListener('scroll', setOnTop)
})

onUnmounted(() => document.removeEventListener('scroll', setOnTop))
</script>

<template>
  <header class="sticky w-full top-0 surface surface-blurry border-b border-gray-200 dark:border-gray-800 border-opacity-50 h-header z-10">
    <Container class="grid grid-cols-12 items-center h-full">
      <div class="col-span-6 lg:col-span-3">
        <NavbarLogo />
      </div>

      <div class="hidden lg:block lg:col-span-6">
        <!-- <HeaderNavigation /> -->
      </div>

      <div class="col-span-6 lg:col-span-3 flex justify-end">
        <MobileNav class="flex lg:hidden" />
        <ThemeSelect class="hidden lg:block" />
      </div>
    </Container>
  </header>
</template>
