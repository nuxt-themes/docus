<script setup lang="ts">
import appConfig from '#build/app.config'

const { page } = useContent()
const { config, tree } = useDocus()
const route = useRoute()

const { tokens } = appConfig

const fallbackValue = (value: string, fallback = true) => {
  if (typeof page.value?.[value] !== 'undefined') { return page.value[value] }
  return fallback
}

const hasContent = computed(() => !page.value || page.value?.body?.children?.length > 0)
const hasToc = computed(() => page.value?.toc !== false && page.value?.body?.toc?.links?.length >= 2)
const hasAside = true

// const hasAside = computed(() => page.value?.aside !== false && (tree.value?.length > 1 || tree.value?.[0]?.children?.length))
const bottom = computed(() => fallbackValue('bottom', true))
const isOpen = ref(false)

/*
** This below is a workaround until Nuxt has a proper support for layouts and Suspense
*/
const asideNav = ref<any>(null)

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
  <Container
    :padded="config?.main?.padded"
    class="docs-page-content"
    :class="[hasToc && 'has-toc', hasAside && 'has-aside', tokens.docsLayout.layout, tokens.docsLayout.root]"
  >
    <aside
      ref="asideNav"
      class="aside-nav"
      :class="[Object.values(tokens.docsLayout.asideNav)]"
    >
      <AppNavigation
        v-if="config.aside?.navigation"
        vertical
      />
      <DocsNavigation
        v-if="tree?.length > 0"
        :links="tree"
      />
    </aside>

    <article class="page-content">
      <slot v-if="hasContent" />
      <!-- <Alert
        v-else
        type="info"
      >
        Start writing in <ProseCodeInline>content/{{ page._file }}</ProseCodeInline> to see this page taking shape.
      </Alert> -->
      <template v-if="hasContent && page && bottom">
        <div class="page-content-bottom">
          <DocsContentBottom />
          <DocsPrevNext />
        </div>
      </template>
    </article>

    <div
      v-if="hasToc"
      class="toc"
      :class="[Object.values(tokens.docsLayout.toc.root)]"
    >
      <div
        class="toc-wrapper"
        :class="[Object.values(tokens.docsLayout.toc.wrapper)]"
      >
        <button
          :class="[Object.values(tokens.docsLayout.toc.button)]"
          @click="isOpen = !isOpen"
        >
          <span
            class="title"
            :class="[Object.values(tokens.docsLayout.toc.button.title)]"
          >
            Table of Contents
          </span>
          <Icon
            name="heroicons-outline:chevron-right"
            class="icon"
            :class="[isOpen && 'rotate', Object.values(tokens.docsLayout.toc.button.icon)]"
          />
        </button>
        <div
          class="docs-toc-content"
          :class="[isOpen && 'opened', Object.values(tokens.docsLayout.toc.content)]"
        >
          <DocsToc @move="isOpen = false" />
        </div>
      </div>
    </div>
  </Container>
</template>

<style scoped lang="ts">

</style>
