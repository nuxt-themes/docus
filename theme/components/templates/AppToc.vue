<template>
  <div v-if="toc.length" class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
    <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) -mt-10 pt-10 pb-4 top-18">
      <div class="mb-8">
        <h5 class="text-gray-900 dark:text-gray-100 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">{{ $t('toc.title') }}</h5>

        <ul class="overflow-x-hidden font-medium">
          <li
            v-for="link of toc"
            :key="link.id"
            class="hover:text-gray-900 dark:hover:text-gray-100"
            :class="{ 'text-primary-500 hover:text-primary-500': $route.hash === `#${link.id}` }"
          >
            <a
              :href="`#${link.id}`"
              class="block transform transition-colors duration-100 py-2 scrollactive-item"
              :class="{
                'ml-2': link.depth === 3,
                'ml-3': link.depth === 4,
                'ml-4': link.depth === 5,
                'ml-5': link.depth === 6
              }"
            >{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    toc: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'settings'
    ])
  }
}
</script>
