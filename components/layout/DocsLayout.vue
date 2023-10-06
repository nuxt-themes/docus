<script setup lang="ts">
const { page } = useContent()
const { config, tree } = useDocus()
const route = useRoute()

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
    class="docs-page-content relative flex lg:grid flex-col-reverse lg:gap-6 xl:gap-8 [&.has-toc]:lg:grid-cols-[minmax(320px,1fr)minmax(200px,200px)] [&.has-toc]:xl:grid-cols-[minmax(320px,1fr)minmax(250px,250px)] [&.has-aside]:lg:grid-cols-[minmax(200px,200px)minmax(320px,1fr)] [&.has-aside]:xl:grid-cols-[minmax(250px,250px)minmax(320px,1fr)] [&.has-aside.has-toc]:lg:grid-cols-[minmax(200px,200px)minmax(320px,1fr)minmax(200px,200px)] [&.has-aside.has-toc]:xl:grid-cols-[minmax(250px,250px)minmax(320px,1fr)minmax(250px,250px)]"
    :class="[hasToc && 'has-toc', hasAside && 'has-aside']"
  >
    <aside
      ref="asideNav"
      class="aside-nav hidden lg:block lg:sticky overflow-y-auto self-start lg:py-6 xl:py-8 lg:pe-6 xl:pe-8 lg:top-[var(--app-header-height)] lg:h-[calc(100vh-var(--app-header-height))]"
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

    <article class="page-content relative flex flex-1 flex-col py-8 lg:py-12 w-full mx-auto lg:mt-0">
      <div class="prose prose-gray">
        <slot v-if="hasContent" />
      <!-- <Alert
        v-else
        type="info"
      >
        Start writing in <ProseCodeInline>content/{{ page._file }}</ProseCodeInline> to see this page taking shape.
      </Alert> -->
      </div>
      <template v-if="hasContent && page && bottom">
        <div class="page-content-bottom flex flex-col gap-8">
          <DocsContentBottom />
          <DocsPrevNext />
        </div>
      </template>
    </article>

    <div
      v-if="hasToc"
      class="toc sticky flex lg:self-start top-[var(--app-header-height)] overflow-auto border-b lg:border-b-0 border-primary-static -mx-4 sm:-mx-6 lg:mx-0 lg:p-6 xl:p-8 pe-0 lg:h-[calc(100vh-var(--app-header-height))]"
    >
      <div class="toc-wrapper w-full h-full backdrop-filter lg:backdrop-filter-none backdrop-backgroundColor lg:bg-transparent dark:lg:bg-transparent">
        <button
          class="flex lg:hidden items-center w-full h-full p-4 sm:px-6"
          @click="isOpen = !isOpen"
        >
          <span class="title text-sm font-semibold me-1">
            Table of Contents
          </span>
          <Icon
            name="heroicons-outline:chevron-right"
            class="icon w-4 h-4 transition-transform duration-100 [&.rotate]:rotate-90"
            :class="[isOpen && 'rotate']"
          />
        </button>
        <div
          class="docs-toc-content hidden [&.opened]:block lg:block mb-4 lg:mt-0 [&.opened]:px-4 [&.opened]:sm:px-6 [&.opened]:lg:px-0 [&.opened]:overflow-auto [&.opened]:max-h-[50vh] [&.opened]:lg:max-h-none"
          :class="[isOpen && 'opened']"
        >
          <DocsToc @move="isOpen = false" />
        </div>
      </div>
    </div>
  </Container>
</template>
