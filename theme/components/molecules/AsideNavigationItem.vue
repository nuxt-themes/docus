<template>
  <li :class="{ 'active': isCategoryActive() }">
    <h5
      v-if="category"
      class="py-2 text-base font-semibold text-gray-900 transition duration-200 cursor-pointer dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400"
      @click="collapseCategory"
    >
      {{ category }}
    </h5>
    <ul v-if="!collapse || isCategoryActive()" class="mb-2">
      <li v-for="doc of docs" :key="doc.slug">
        <NuxtLink
          :to="$contentLocalePath(doc.to)"
          class="relative inline-flex items-center justify-between px-4 py-1 transition duration-200 border-l border-gray-100 dark:border-gray-800 hover:text-primary-500 dark:hover:text-primary-400"
          :class="{ 'text-primary-500 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-400 border-primary-500 dark:border-primary-500': isLinkActive(doc) }"
        >
          <span>
            {{ doc.menuTitle || doc.title }}
          </span>

          <client-only>
            <span
              v-if="doc.draft"
              class="w-2 h-2 ml-2 bg-yellow-500 rounded-full opacity-75"
            />
            <span
              v-else-if="isDocumentNew(doc)"
              class="w-2 h-2 ml-2 rounded-full opacity-75 animate-pulse bg-primary-500"
            />
          </client-only>
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script>
import { withTrailingSlash } from 'ufo'

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
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    collapseCategory () {
      if (this.isCategoryActive()) { return }
      this.collapse = !this.collapse
    },
    isCategoryActive () {
      return this.docs.some(document => this.isLinkActive(document))
    },
    isLinkActive (doc) {
      return withTrailingSlash(this.$route.path) === withTrailingSlash(this.$contentLocalePath(doc.to))
    },
    isDocumentNew (document) {
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
