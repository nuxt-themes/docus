<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

const { config } = useDocus()
const { navigation } = useContent()
const { y } = useWindowScroll()
const route = useRoute()

const showDocsSearch = ref(false)

const hasDrawer = computed(() => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length)

const isBasicLayout = computed(() => route.meta.layout === 'basic')

const { meta_K, Escape } = useMagicKeys()

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
  <header :class="{ 'has-drawer': hasDrawer, 'is-basic-layout': isBasicLayout, 'on-top': y === 0 }">
    <Container>
      <div class="header-layout">
        <div class="section left">
          <AppHeaderDrawer v-if="hasDrawer" />
          <AppHeaderLogo />
        </div>

        <div class="section center">
          <AppHeaderLogo />
          <AppNavigation v-if="config.header.navigation" />
          <DocsSearchButton
            v-else
            class="docs-search-button-desktop"
            @click="showDocsSearch = true"
          />
          <DocsSearch v-model="showDocsSearch" />
        </div>

        <div class="section right">
          <!-- <AppTextDirection /> -->
          <DocsSearchButton
            :class="{'has-navigation': config.header.navigation}"
            class="docs-search-button-mobile"
            @click="showDocsSearch = true"
          />
          <AppColorMode />
          <div class="social-icons">
            <AppSocialIcons />
          </div>
        </div>
      </div>
    </Container>
  </header>
</template>

<style scoped lang="ts">
css({
  // ':deep(.icon)': {
  //   width: '{docus.app.header.icon.size}',
  //   height: '{docus.app.header.icon.size}'
  // },

  // '.header-logo': {
  //   '.left &': {
  //     '.has-drawer &': {
  //       display: 'none',
  //       '@lg': {
  //         display: 'block'
  //       }
  //     },
  //   },

  //   '.center &': {
  //     display: 'none',
  //     '.has-drawer &': {
  //       display: 'block',
  //       '@lg': {
  //         display: 'none'
  //       },
  //     },
  //   }
  // },

  header: {
    // backdropFilter: '{docus.app.header.backdropFilter}',
    // position: 'sticky',
    // top: 0,
    // zIndex: 10,
    // width: '100%',
    // borderBottomWidth: '{docus.app.header.borderBottomWidth}',
    // borderBottomStyle: '{docus.app.header.borderBottomStyle}',
    // borderBottomColor: '{docus.app.header.borderBottomColor}',
    // backgroundColor: '{docus.app.header.backgroundColor}',
    // height: '{docus.app.header.height}',

    // '&.is-basic-layout.on-top': {
    //   background: 'transparent',
    //   borderColor: 'transparent',
    //   backdropFilter: 'none',
    // },

    '.docs-search-button-desktop': {
      display: 'none',
      '@lg': {
        display: 'flex',
        width: '100%',
      }
    },

    '.docs-search-button-mobile': {
      display: 'flex',
      '@lg': {
        display: 'none'
      },
      '&.has-navigation': {
        display: 'flex',
      }
    },

    // '.header-layout': {
    //   display: 'grid',
    //   height: '100%',
    //   gridTemplateColumns: '{docus.app.header.layout.gridTemplateColumns}',
    //   gap: '{docus.app.header.layout.gap}',
    // },

    // '.section': {
      // display: 'flex',
      // alignItems: 'center',
      // flex: 'none',

      // '&.left': {
      //   // gridColumn: '{docus.app.header.layout.left.gridColumn}',
      //   '@lg': {
      //     marginInlineStart: 0
      //   },
      // },

      // '&.center': {
      //   // gridColumn: '{docus.app.header.layout.center.gridColumn}',
      //   justifyContent: 'center',
      //   flex: '1',
      //   zIndex: '1'
      // },

      // '&.right': {
      //   // display: 'flex',
      //   // gridColumn: '{docus.app.header.layout.right.gridColumn}',
      //   // justifyContent: 'flex-end',
      //   // alignItems: 'center',
      //   // flex: 'none',
      //   marginInlineEnd: 'calc(0px - {space.4})',

      //   // '.social-icons': {
      //   //   display: 'none',
      //   //   '@md': {
      //   //     display: 'flex',
      //   //     alignItems: 'center',
      //   //   }
      //   // }
      // }
    // }
  }
})
</style>
