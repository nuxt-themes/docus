<template>
  <div class="relative w-full h-full flex items-center justify-center mr-20">
    <ul class="flex space-x-12 h-full">
      <li
        v-for="(link, index) in headerLinks"
        :key="link.slug"
        class="relative capitalize font-medium flex flex-col items-center justify-center space-y-1 text-center"
        @mouseover="hoverLinks(index)"
        @mouseleave="hover = false"
      >
        <NuxtLink
          :to="`/${link.slug}/${link.children[0].slug || ''}`"
          :class="{
            'text-primary-green': currentSlug === link.slug
          }"
        >
          {{ link.slug }}
        </NuxtLink>

        <!-- <div v-show="hover && itemIndex === index">
          <div class="dropdown flex items-center justify-center w-52 -mt-2">
            <img src="~/static/img/header/polygon.svg" class="w-5 h-5" />
          </div>
          <ul class="light:bg-white dark:bg-secondary light:border rounded-md border-gray-100 py-2 dropdown">
            <li v-for="(nav, i) in link.children.filter(item => item.slug && item.slug !== ``)" :key="nav.slug">
              <NuxtLink
                :to="`/${link.slug}/${nav.slug}`"
                class="
                  mx-2
                  rounded-md
                  capitalize
                  p-2
                  flex
                  justify-start
                  items-center
                  h-full
                  w-52
                  space-x-4
                  light:hover:bg-gray-100
                  dark:hover:bg-secondary-light
                "
              >
                <img :src="`/img/header/dropdown-gem-${i + 1 > 4 ? '4' : i + 1}.svg`" class="w-1/5" />
                <span> {{ nav.slug }} </span>
              </NuxtLink>
            </li>
          </ul>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, useRoute, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // @ts-ignore
    const { $docus } = useContext()

    const route = useRoute()
    const hover = ref(false)
    const itemIndex = ref(null)
    const currentNav = computed(() => $docus.currentNav.value)

    // computed
    const headerLinks = computed(() => currentNav.value.filter(link => link.slug !== ''))

    const currentSlug = computed(() => {
      return route.value.path !== '/' && route?.value?.params?.pathMatch
        ? route.value.params.pathMatch.split('/')[0]
        : null
    })

    // methods
    function hoverLinks(index) {
      itemIndex.value = index
      hover.value = true
    }

    return {
      headerLinks,
      currentSlug,
      hoverLinks,
      hover,
      itemIndex
    }
  }
})
</script>
<style scoped lang="postcss">
.nuxt-link-active {
  color: rgba(52, 211, 153);
}
.dropdown {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.menu li {
  display: block;
  position: relative;
}

.menu li ul {
  position: absolute;
  left: 0;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
