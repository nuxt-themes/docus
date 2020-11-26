<template>
  <div v-if="toc.length" class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
    <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) -mt-10 pt-10 pb-4 top-18">
      <div class="mb-8">
        <h5 class="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">{{ $t('toc.title') }}</h5>

        <Scrollactive highlight-first-item active-class="text-primary-500" class="overflow-x-hidden font-medium" :offset="0" tag="ul">
          <li
            v-for="link of toc"
            :key="link.id"
            class="text-gray-500 hover:text-gray-900"
            :class="{
              'border-t border-dashed dark:border-gray-800 first:border-t-0 pt-1 mt-1 first:pt-0 first:mt-0': link.depth === 2
            }"
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
        </Scrollactive>
      </div>
    </div>
  </div>
</template>

<script>
import Scrollactive from 'vue-scrollactive/src/scrollactive.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Scrollactive
  },
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
