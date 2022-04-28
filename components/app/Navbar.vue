<script setup lang="ts">
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
  <header class="d-header surface blurry-surface z-10">
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
