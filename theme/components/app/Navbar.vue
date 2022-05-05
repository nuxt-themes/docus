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
  <header class="sticky top-0 z-10 w-full border-b border-gray-200 border-opacity-50 surface surface-blurry h-header dark:border-gray-800">
    <Container class="flex flex-none h-full">
      <div class="flex items-center flex-1 lg:flex-none">
        <NavbarLogo />
      </div>

      <div class="flex items-center flex-1">
        <NavbarCenter />
      </div>

      <div class="flex items-center justify-end flex-1 lg:gap-4">
        <LastRelease v-if="theme?.github?.releases" class="mr-1.5 hidden lg:block" />
        <MobileNav class="flex lg:hidden" />
        <SocialIcons size="h-6 w-6 hidden lg:block" spacing="lg:mr-1.5" />
        <ThemeSelect size="h-6 w-6 hidden lg:block" spacing="lg:mr-1.5" />
      </div>
    </Container>
  </header>
</template>
