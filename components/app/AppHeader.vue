<script setup lang="ts">
import { useElementBounding, useMagicKeys } from '@vueuse/core'
import appConfig from '#build/app.config'

const { config } = useDocus()
const { navigation } = useContent()
const { y } = useWindowScroll()
const route = useRoute()

const { tokens } = appConfig

const appHeaderRef = ref(null) as Ref<HTMLElement | null>

const { height } = useElementBounding(appHeaderRef)

const showDocsSearch = ref(false)

const hasDrawer = computed(() => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length)

const isBasicLayout = computed(() => route.meta.layout === 'basic')

const { meta_K, Escape } = useMagicKeys()

watch(height, (value) => {
  document.documentElement.style.setProperty('--app-header-height', `${value}px`)
})

watch(meta_K, (v) => {
  if (v) {
    showDocsSearch.value = !showDocsSearch.value
  }
})

watch(Escape, () => {
  if (showDocsSearch.value)
    showDocsSearch.value = false
})
</script>

<template>
  <header
    ref="appHeaderRef"
    class="app-header sticky top-0 z-10 w-full"
    :class="[tokens.appHeader.height, isBasicLayout && y === 0 ? '' : `${tokens.appHeader.backdropFilter} ${tokens.appHeader.backgroundColor} ${tokens.appHeader.border}`]"
  >
    <Container padded>
      <div
        class="header-layout grid h-full"
        :class="[tokens.appHeader.layout.gridTemplateColumns, tokens.appHeader.layout.gap]"
      >
        <div
          class="section left lg:ms-0 flex items-center flex-none"
          :class="[tokens.appHeader.layout.left.gridColumn]"
        >
          <AppHeaderDrawer v-if="hasDrawer" />
          <AppHeaderLogo :class="{'hidden lg:block': hasDrawer}" />
        </div>

        <div
          class="section center flex items-center flex-none justify-center flex-1 z-1"
          :class="[tokens.appHeader.layout.center.gridColumn]"
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
          class="section right -me-4 flex items-center flex-none justify-end items-center flex-none"
          :class="[tokens.appHeader.layout.right.gridColumn]"
        >
          <DocsSearchButton
            :class="[config.header.navigation ? 'flex': 'flex lg:hidden']"
            @click="showDocsSearch = true"
          />
          <AppColorMode />
          <div class="hidden md:flex md:items-center">
            <AppSocialIcons :class="[tokens.appHeader.icon]" />
          </div>
        </div>
      </div>
    </Container>
  </header>
</template>