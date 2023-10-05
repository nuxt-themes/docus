<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig
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
    :class="[Object.values(tokens.appHeaderDrawer.button)]"
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
      class="nav"
      :class="[Object.values(tokens.appHeaderDrawer.nav)]"
      @click.stop
    >
      <div
        class="drawer-header"
        :class="[Object.values(tokens.appHeaderDrawer.navHeader)]"
      >
        <button
          :class="[Object.values(tokens.appHeaderDrawer.button)]"
          aria-label="Menu"
          @click="show = false"
        >
          <Icon
            name="heroicons-outline:x"
            aria-hidden="”true”"
          />
        </button>

        <div
          class="icons"
          :class="[Object.values(tokens.appHeaderDrawer.navHeaderIcons)]"
        >
          <AppSocialIcons />
        </div>
      </div>

      <DocsNavigation
        :links="links"
        class="links"
        :class="[Object.values(tokens.appHeaderDrawer.navLinks)]"
      />
    </nav>
  </Drawer>
</template>

