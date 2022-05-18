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
  <header class="surface surface-blurry h-header sticky top-0 z-10 w-full border-b surface-border">
    <Container padded class="flex h-full lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="transition-base text-secondary-hover flex flex-none items-center lg:col-span-2 lg:flex-none">
        <NavbarLogo />
      </div>

      <div class="flex flex-1 items-center lg:col-span-8">
        <NavbarCenter class="hidden lg:flex" />
      </div>

      <div class="flex flex-none items-center justify-end lg:col-span-2 lg:gap-4 lg:pl-4">
        <LastRelease v-if="theme?.github?.releases && theme?.github?.showVersion" class="mr-1.5 hidden lg:block" />
        <MobileNav />
        <SocialIcons size="h-6 w-6 hidden lg:block" spacing="lg:mr-1.5" />
        <ThemeSelect size="h-6 w-6 hidden lg:block" />
      </div>
    </Container>
  </header>
</template>
