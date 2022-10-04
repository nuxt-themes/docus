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
const hasAside = computed(() => page.value?.aside !== false && navigation.value.length > 1)
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
  asideScroll.value.scrollTop = asideNav.value.scrollTop
})
</script>

<template>
  <AppContainer padded class="relative flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-8">
    <!-- Aside -->
    <aside
      v-if="hasAside"
      ref="asideNav"
      class="lg:top-header hidden overflow-y-auto overflow-x-hidden pb-8 lg:sticky lg:col-span-2 lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:self-start lg:pt-8"
    >
      <DocsAside />
    </aside>

    <!-- Page Body -->
    <div
      class="relative flex flex-col flex-1 pt-8 pb-8 lg:mt-0 page-body"
      :class="{
        'lg:col-span-12': !hasAside && !hasToc,
        'lg:col-span-10': (!hasToc || !hasAside) && !(!hasAside && !hasToc),
        'lg:col-span-8': hasToc && hasAside,
        'pt-12 lg:pt-8': hasToc,
      }"
    >
      <slot v-if="hasBody" />
      <Alert v-else type="info" class="!mt-0">
        Start writing in <ProseCodeInline>content/{{ page._file }}</ProseCodeInline> to see this page taking shape.
      </Alert>
      <template v-if="hasBody && page && bottom">
        <DocsPageBottom />
        <ProseHr />
        <DocsPrevNext />
      </template>
    </div>
    <!-- TOC -->
    <div
      v-if="hasToc"
      :class="{
        'flex items-center lg:block': !isOpen,
      }"
      class="sticky flex items-center px-4 -mx-4 -mt-8 toc top-header lg:max-h-page sm:-mx-6 sm:px-6 lg:col-span-2 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pt-8 lg:backdrop-blur-none overflow-y-auto overflow-x-hidden"
    >
      <div class="w-full cursor-pointer sm:cursor-auto" @click="isOpen = !isOpen">
        <button class="flex items-center gap-1 py-3 lg:hidden">
          <span class="text-xs font-semibold">Table of Contents</span>
          <Icon name="heroicons-outline:chevron-right" class="w-4 h-4 transition-transform duration-100 transform" :class="[isOpen ? 'rotate-90' : 'rotate-0']" />
        </button>

        <DocsToc class="mb-4 lg:mt-0" :class="[isOpen ? 'lg:block' : 'hidden lg:block']" @move="isOpen = false" />
      </div>
    </div>
  </AppContainer>
</template>

<style lang="postcss" scoped>
.page-body :deep(div:first-child h1:first-child) {
  @apply mt-0 text-2xl font-extrabold tracking-tight u-text-gray-900 sm:text-3xl;
}
.page-body :deep(div:first-child h1:first-child + p) {
  @apply mt-0 mb-8 sm:text-lg u-text-gray-500 pb-8 border-b u-border-gray-100;
  & a {
    @apply u-text-gray-700 hover:border-gray-700;
  }
}
.toc {
  &:before {
    content: ' ';
    width: 100%;
    right: 0;
    @apply absolute top-0 z-[-1] block h-full bg-white/95 backdrop-blur dark:bg-black/95;
  }
}

@screen lg {
  .toc {
    &:before {
      display: none;
    }
  }
}
</style>
