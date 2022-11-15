<script setup lang="ts">
const { page, navigation } = useContent()
const route = useRoute()

const fallbackValue = (value: string, fallback = true) => {
  if (typeof page.value?.[value] !== 'undefined') {
    return page.value[value]
  }

  return fallback
}

const hasBody = computed(() => !page.value || page.value?.body?.children?.length > 0)
const hasToc = computed(() => page.value?.toc !== false && page.value?.body?.toc?.links?.length >= 2)

// TODO: get navigation links from aside level
const hasAside = computed(() => page.value?.aside !== false && navigation.value?.length > 1)
const bottom = computed(() => fallbackValue('bottom', true))
const isOpen = ref(false)

/*
** This below is a workaround until Nuxt has a proper support for layouts and Suspense
*/
const asideNav = ref(null)

const getParentPath = () => route.path.split('/').slice(0, 2).join('/')
const asideScroll = useState('asideScroll', () => {
  return {
    parentPath: getParentPath(),
    scrollTop: asideNav.value?.scrollTop || 0
  }
})

function watchScrollHeight () {
  if (!asideNav.value) { return }
  if (asideNav.value.scrollHeight === 0) {
    setTimeout(watchScrollHeight, 0)
  }
  asideNav.value.scrollTop = asideScroll.value.scrollTop
}
onMounted(() => {
  if (asideScroll.value.parentPath !== getParentPath()) {
    asideScroll.value.parentPath = getParentPath()
    asideScroll.value.scrollTop = 0
  } else {
    watchScrollHeight()
  }
})

onBeforeUnmount(() => {
  if (!asideNav.value) { return }
  asideScroll.value.scrollTop = asideNav.value.scrollTop
})
</script>

<template>
  <AppContainer padded class="docs-page-content">
    <!-- Aside -->
    <aside
      v-if="hasAside"
      ref="asideNav"
      class="aside-nav"
    >
      <DocsAside />
    </aside>

    <!-- Page Body -->
    <article
      class="page-body"
      :class="{
        'one-column': !hasAside && !hasToc,
        'two-column': (!hasToc || !hasAside) && !(!hasAside && !hasToc),
        'three-column': hasToc && hasAside,
        'with-toc': hasToc,
      }"
    >
      <slot v-if="hasBody" />
      <Alert v-else type="info">
        Start writing in <ProseCodeInline>content/{{ page._file }}</ProseCodeInline> to see this page taking shape.
      </Alert>
      <template v-if="hasBody && page && bottom">
        <DocsPageBottom />
        <ProseHr />
        <DocsPrevNext />
      </template>
    </article>
    <!-- TOC -->
    <div
      v-if="hasToc"
      :class="{
        'closed': !isOpen,
      }"
      class="toc"
    >
      <div class="toc-wrapper" >
        <button @click="isOpen = !isOpen">
          <span class="title">Table of Contents</span>
          <Icon name="heroicons-outline:chevron-right" class="icon" :class="[isOpen && 'rotate']" />
        </button>

        <div class="docs-toc-wrapper" :class="[isOpen && 'opened']">
          <DocsToc @move="isOpen = false" />
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<style scoped lang="ts">
css({
  '.docs-page-content': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column-reverse',
    '@mq.lg': {
      display: 'grid',
      gap: '{space.8}',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))'
    }
  },
  '.aside-nav': {
    display: 'none',
    overflowY: 'auto',
    '@mq.lg': {
      display: 'block',
      position: 'sticky',
      top: '{docus.header.height}',
      gridColumn: 'span 2/span 2',
      alignSelf: 'flex-start',
      height: 'calc(100vh - {docus.header.height})',
      py: '{space.8}',
    }
  },
  '.page-body': {
    position: 'relative',
    display: 'flex',
    flexDirection: "column",
    flex: '1 1 0%',
    py: '{space.8}',
    '&.one-column': {
      '@mq.lg': {
        gridColumn: 'span 12 / span 12'
      }
    },
    '&.two-column': {
      '@mq.lg': {
        gridColumn: 'span 10 / span 10'
      }
    },
    '&.three-column': {
      '@mq.lg': {
        gridColumn: 'span 8 / span 8'
      }
    },
    '&.with-toc': {
      paddingTop: '{space.12}',
      '@mq.lg': {
        paddingTop: '{space.8}',
      }
    },
    '@mq.lg': {
      marginTop: 0
    },
    // `.not-prose` can be useful if creating <h1> with a component (404 page is an example)
    ':deep(h1:not(.not-prose):first-child)': {
      marginTop: 0,
      fontSize: '{text.2xl.fontSize}',
      lineHeight: '{text.2xl.lineHeight}',
      fontWeight: '{fontWeights.extrabold}',
      letterSpacing: '{letterSpacings.tight}',
      '@mq.sm': {
        fontSize: '{text.3xl.fontSize}',
        lineHeight: '{text.3xl.lineHeight}',
      }
    },
    // `.not-prose` can be useful if creating <h1> with a component (404 page is an example)
    ':deep(h1:not(.not-prose)first-child + p)': {
      marginTop: 0,
      marginBottom: '{space.8}',
      paddingBottom: '{space.8}',
      borderBottom: '1px solid {colors.gray.100}',
      color: '{colors.gray.500}',
      '@mq.sm': {
        fontSize: '{text.lg.fontSize}',
        lineHeight: '{text.lg.lineHeight}',
      },
      '@dark': {
        color: '{colors.gray.400}',
        borderColor: '{colors.gray.800}'
      },
      a: {
        color: '{colors.gray.700}',
        '@dark': {
          color: '{colors.gray.200}',
        },
        "&:hover": {
          borderColor: '{colors.gray.700}'
        }
      }
    }
  },
  '.toc': {
    position: 'sticky',
    top: '{docus.header.height}',
    display: 'flex',
    alignItems: 'center',
    mx: 'calc(0px - {space.4})',
    '@mq.sm': {
      mx: 'calc(0px - {space.6})',
    },
    '@mq.lg': {
      maxHeight: '{docus.page.height}',
      gridColumn: 'span 2 / span 2',
      mx: 0,
      alignSelf: 'flex-start',
      py: '{space.8}',
    },
    '&.closed': {
      display: 'flex',
      alignItems: 'center',
      '@mq.lg': {
        display: 'block'
      }
    },
    '.toc-wrapper': {
      width: '100%',
      // TODO: rgba() doesn't work in tokens.config; replace with backdrop tokens
      backgroundColor: 'red',
      px: '{space.4}',
      '@mq.sm': {
        px: '{space.6}',
      },
      '@mq.lg': {
        px: 0,
        backgroundColor: 'transparent',
        backdropFilter: 'none'
      },
      button: {
        display: 'flex',
        alignItems: 'center',
        py: '{space.3}',
        width: '100%',
        height: '100%',
        '@mq.lg': {
          display: 'none'
        },
        '.title': {
          fontSize: '{text.xs.fontSize}',
          lineHeight: '{text.xs.lineHeight}',
          fontWeight: '{fontWeights.semibold}',
          marginRight: '{space.1}',
        },
        '.icon': {
          width: '{space.4}',
          height: '{space.4}',
          transition: 'transform 100ms',
          '&.rotate': {
            transform: 'rotate(90deg)'
          }
        }
      },
      '.docs-toc-wrapper': {
        display: 'none',
        marginBottom: '{space.4}',
        '&.opened': {
          display: 'block'
        },
        '@mq.lg': {
          marginTop: 0,
          display: 'block'
        }
      }
    }
  }
})
</style>
