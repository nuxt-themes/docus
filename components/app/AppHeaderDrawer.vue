<script setup lang="ts">
const { navigation } = useContent()
const { config } = useDocus()
const router = useRouter()

const filtered = computed(() => config.value.aside?.exclude || [])

const links = computed(() => {
  return (navigation.value || []).filter((item: any) => {
    if (filtered.value.includes(item._path)) { return false }
    return true
  })
})

const show = ref(false)

router.afterEach(() => {
  if (show.value) {
    show.value = false
  }
})
</script>

<template>
  <button
    class="relative z-10 flex lg:hidden p-4 ps-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    aria-label="Menu"
    @click="show = !show"
  >
    <Icon
      name="heroicons-outline:menu"
      aria-hidden="”true”"
    />
  </button>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <Drawer v-model="show">
    <nav
      class="nav w-full border-r border-primary-static bg-gray-50 dark:bg-gray-900"
      @click.stop
    >
      <div class="drawer-header flex items-center justify-between border-b border-primary-static gap-2 px-4 sm:px-6 h-16">
        <button
          class="relative z-10 flex lg:hidden p-4 ps-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="Menu"
          @click="show = false"
        >
          <Icon
            name="heroicons-outline:x"
            aria-hidden="”true”"
          />
        </button>

        <div class="icons flex items-center overflow-auto [&_.icon]:w-4 [&_.icon]:h-4">
          <AppSocialIcons />
        </div>
      </div>

      <DocsNavigation
        :links="links"
        class="links h-[calc(100vh-var(--app-header-height))] overflow-y-auto px-4 sm:px-6 pt-6"
      />
    </nav>
  </Drawer>
</template>

