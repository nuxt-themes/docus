<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import appConfig from '#build/app.config'

const { tokens } = appConfig

const appHeaderRef = ref(null) as Ref<HTMLElement | null>
const { height } = useElementBounding(appHeaderRef)

const colorMode = useColorMode()
const onClick = () => {
  const values = ['system', 'light', 'dark']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length
  colorMode.preference = values[next]
}

watch(height, (value) => {
  document.documentElement.style.setProperty('--app-header-height', `${value}px`)
})
</script>

<template>
  <header ref="appHeaderRef" class="app-header" :class="[tokens.appHeader.height]">
    <Container>
      <div class="header-layout">
        <div class="section left"></div>
        <div class="section center"></div>
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