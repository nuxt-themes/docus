<script setup lang="ts">
import { useElementBounding, useMagicKeys } from '@vueuse/core'

const { config } = useDocus()
const { navigation } = useContent()
const { y } = useWindowScroll()
const route = useRoute()

const appHeaderRef = ref(null) as Ref<HTMLElement | null>

const { height } = useElementBounding(appHeaderRef)

const showDocsSearch = ref(false)

const hasDrawer = computed(
  () => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length
)

const isBasicLayout = computed(() => route.meta.layout === 'basic')

const { meta_K, Escape } = useMagicKeys()

watch(height, (value) => {
  document.documentElement.style.setProperty(
    '--app-header-height',
    `${value}px`
  )
})

watch(meta_K, (v) => {
  if (v) {
    showDocsSearch.value = !showDocsSearch.value
  }
})

watch(Escape, () => {
  if (showDocsSearch.value) showDocsSearch.value = false
})
</script>

<template>
  <header
    ref="appHeaderRef"
    class="app-header sticky top-0 z-10 w-full h-16"
    :class="[
      isBasicLayout && y === 0
        ? ''
        : 'backdrop-filter backdrop-backgroundColor border-b border-primary-static',
    ]"
  >
    <Container padded>
      <div class="header-layout grid h-full grid-cols-12 gap-2">
        <div
          class="section left lg:ms-0 flex items-center flex-none col-span-4"
        >
          <AppHeaderDrawer v-if="hasDrawer" />
          <AppHeaderLogo :class="{ 'hidden lg:block': hasDrawer }" />
        </div>

        <div
          class="section center flex items-center flex-none justify-center flex-1 z-1 col-span-4"
        >
          <AppHeaderLogo :class="[hasDrawer ? 'block lg:hidden' : 'hidden']" />
          <AppNavigation
            v-if="config.header.navigation"
            class="hidden lg:flex"
          />
          <DocsSearchButton
            v-else
            class="hidden lg:flex lg:w-full"
            @click="showDocsSearch = true"
          />
          <DocsSearch v-model="showDocsSearch" />
        </div>

        <div
          class="section right -me-4 flex items-center flex-none justify-end items-center flex-none col-span-4"
        >
          <DocsSearchButton
            :class="[config.header.navigation ? 'flex' : 'flex lg:hidden']"
            @click="showDocsSearch = true"
          />
          <AppColorMode />
          <div class="hidden md:flex md:items-center">
            <AppSocialIcons class="[&>.icon]:w-4 [&>.icon]:h-4" />
          </div>
        </div>
      </div>
    </Container>
  </header>
</template>
