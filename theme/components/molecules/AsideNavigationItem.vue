<template>
  <li :class="{ active: isCategoryActive }">
    <h5
      v-if="category"
      class="py-2 text-base font-semibold text-gray-900 transition duration-200 cursor-pointer dark:text-gray-100"
      :class="[
        isCategoryActive ? '' : 'hover:text-gray-600 dark:hover:text-gray-400'
      ]"
      @click="collapseCategory"
    >
      {{ category }}
    </h5>
    <ul v-if="!collapse || isCategoryActive" class="mb-2">
      <li v-for="doc of docs" :key="doc.to">
        <NuxtLink
          :to="$contentLocalePath(doc.to)"
          class="relative inline-flex items-center justify-between pl-3 py-1.5 transition duration-200 border-l border-gray-100 dark:border-gray-800 hover:text-primary"
          :class="{
            'text-primary dark:text-primary-400 hover:text-primary border-primary-500 dark:border-primary-500': $docus.isLinkActive(
              doc.to
            )
          }"
        >
          <DComponent
            v-if="doc.icon"
            :component="doc.icon"
            class="inline-flex mr-2 w-5 h-5 justify-center items-center text-1.2rem"
            >{{ doc.icon }}</DComponent
          >
          <span>
            {{ doc.menuTitle || doc.title }}
          </span>

          <ClientOnly>
            <span
              v-if="doc.draft"
              class="w-2 h-2 ml-2 bg-yellow-500 rounded-full opacity-75"
            />
            <span
              v-else-if="isDocumentNew(doc)"
              class="w-2 h-2 ml-2 rounded-full opacity-75 animate-pulse bg-primary-500"
            />
          </ClientOnly>
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: ''
    },
    docs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      collapse: false
    }
  },
  computed: {
    isCategoryActive() {
      return this.docs.some(document => this.$docus.isLinkActive(document.to))
    }
  },
  methods: {
    collapseCategory() {
      if (this.isCategoryActive) {
        return
      }
      this.collapse = !this.collapse
    },
    isDocumentNew(document) {
      if (process.server) {
        return
      }
      if (!document.version || document.version <= 0) {
        return
      }

      const version = localStorage.getItem(`document-${document.slug}-version`)
      if (document.version > Number(version)) {
        return true
      }

      return false
    }
  }
}
</script>
