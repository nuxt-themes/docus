<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import appConfig from '#build/app.config'

const { navigation } = useContent()

const { tokens } = appConfig

const appHeaderRef = ref(null) as Ref<HTMLElement | null>

const { height } = useElementBounding(appHeaderRef)

const hasDrawer = computed(() => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length)

watch(height, (value) => {
  document.documentElement.style.setProperty('--app-header-height', `${value}px`)
})
</script>

<template>
  <header ref="appHeaderRef" class="app-header" :class="[tokens.appHeader.height]">
    <Container>
      <div class="header-layout">
        <div class="section left">
          <AppHeaderLogo :class="{'hidden lg:block': hasDrawer}" />
        </div>
        <div class="section center">
          <AppHeaderLogo :class="[hasDrawer ? 'block lg:hidden' : 'hidden']"/>
        </div>
        <div class="section right">
          <AppColorMode />
        </div>
      </div>
      <!-- <button
        aria-label="Color Mode"
        @click="onClick"
      >
      color mode
      </button> -->
    </Container>
  </header>
</template>