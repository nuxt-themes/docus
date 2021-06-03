<template>
  <div
    class="algolia-wrapper relative"
    :class="[focused ? 'focused' : 'blurred', !q && 'blurred', appearance]"
  >
    <SvgIcon
      name="search"
      class="
        block
        absolute
        z-10
        h-4
        w-4
        mt-3
        ml-3
        fill-current
        text-light-onSurfaceSecondary
        dark:text-dark-onSurfaceSecondary
        transition-colors
        duration-300
        ease-linear
      "
    />
    <input
      :id="`algolia-${appearance}`"
      :ref="`algolia-${appearance}`"
      v-model="q"
      class="
        nui-search-input
        px-4
        pl-10
        rounded-full
        h-10
        outline-none
        w-full
        font-medium
        transition-colors
        duration-300
        ease-linear
      "
      type="text"
      :name="`search-${appearance}`"
      :placeholder="$t('header.search.placeholder')"
      @focus="focusHandler"
      @blur="blurHandler"
    />
    <button
      v-if="q || appearance === 'mobile'"
      class="
        absolute
        right-0
        top-0
        block
        outline-none
        flex
        h-full
        px-4
        items-center
        justify-center
        text-nuxt-gray
        dark:text-dark-onSurfaceSecondary
        hover:text-nuxt-lightgreen
        dark:hover:text-nuxt-lightgreen
        z-10
      "
      aria-label="Clear input"
      @click="handleCloseClick"
    >
      <SvgIcon
        name="times"
        class="
          block
          h-5
          fill-current
          transition-colors
          duration-300
          ease-linear
        "
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    appearance: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      q: '',
      focused: false,
      search: null
    }
  },
  mounted() {
    // // Avoid loading the script twice
    if (!document.getElementById('_algolia_doc_search_')) {
      const script = document.createElement('script')

      script.setAttribute('type', 'text/javascript')
      script.setAttribute(
        'src',
        '//cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js'
      )
      script.setAttribute('id', '_algolia_doc_search_')
      script.onload = () => {
        this.initDocsearch()
      }
      document.body.appendChild(script)
    } else {
      this.initDocsearch()
    }

    if (this.appearance === 'mobile') {
      this.$refs['algolia-mobile'].focus()
    }
    document.addEventListener('keypress', e => {
      if (e.keyCode === 47) {
        e.preventDefault()
        document.getElementById(`algolia-${this.appearance}`).focus()
      }
    })
  },
  methods: {
    initDocsearch() {
      this.search = window.docsearch({
        apiKey: process.env.DOC_SEARCH_API_KEY,
        indexName: 'nuxtjs',
        inputSelector: `#algolia-${this.appearance}`,
        autocompleteOptions: {
          openOnFocus: true,
          ariaLabel: true
        },
        algoliaOptions: { facetFilters: [`tags:${this.$i18n.locale}`] },
        debug: true // Set debug to true if you want to inspect the dropdown
      })
    },
    resetInputValue() {
      this.q = ''
      this.search && this.search.autocomplete.autocomplete.setVal('')
    },
    handleCloseClick() {
      this.resetInputValue()
      this.search && this.search.autocomplete.autocomplete.close()
      if (this.appearance === 'mobile') {
        this.$emit('close-search')
      } else {
        this.$refs[`algolia-${this.appearance}`].focus()
      }
    },
    focusHandler() {
      this.focused = true
    },
    blurHandler() {
      this.focused = false
      this.search && this.search.autocomplete.autocomplete.close()
    }
  }
}
</script>

<style lang="scss">
.light-mode .algolia-wrapper {
  .nui-search-input {
    background-color: theme('colors.gray.200') !important;
    color: theme('colors.nuxt.gray') !important;
  }

  .algolia-autocomplete .ds-dropdown-menu {
    @apply shadow-lg;

    &::before {
      background-color: theme('colors.light.elevatedSurface');
      border-color: theme('colors.gray.300');
    }

    [class^='ds-dataset-'] {
      background-color: theme('colors.light.elevatedSurface');
      border-color: theme('colors.gray.300');
    }

    .algolia-docsearch-suggestion {
      background-color: theme('colors.light.elevatedSurface');
    }

    .algolia-docsearch-suggestion--category-header {
      & span {
        color: theme('colors.light.onSurfacePrimary');
      }
    }

    .algolia-docsearch-suggestion--title {
      color: theme('colors.light.onSurfacePrimary');
    }

    .algolia-docsearch-suggestion--subcategory-column {
      color: theme('colors.light.onSurfaceSecondary');
    }

    .algolia-docsearch-suggestion--text {
      color: theme('colors.light.onSurfacePrimary');
    }
  }
}

.dark-mode .algolia-wrapper {
  .nui-search-input {
    background-color: theme('colors.dark.surface') !important;
    color: theme('colors.dark.onSurfaceSecondary') !important;
  }

  .algolia-autocomplete .ds-dropdown-menu {
    @apply shadow-2xl;

    &::before {
      background-color: theme('colors.dark.elevatedSurface');
      border-color: theme('colors.gray.900');
    }

    [class^='ds-dataset-'] {
      background-color: theme('colors.dark.elevatedSurface');
      border-color: theme('colors.gray.900');
    }

    .algolia-docsearch-suggestion {
      background-color: theme('colors.dark.elevatedSurface');
    }

    .algolia-docsearch-suggestion--category-header {
      border-color: #618092;

      & span {
        color: theme('colors.dark.onSurfacePrimary');
      }
    }

    .algolia-docsearch-suggestion--title {
      color: theme('colors.dark.onSurfacePrimary');
    }

    .algolia-docsearch-suggestion--subcategory-column {
      color: theme('colors.dark.onSurfaceSecondary');
    }

    .algolia-docsearch-suggestion--text {
      color: theme('colors.dark.onSurfacePrimary');
    }

    .algolia-docsearch-suggestion--content::before {
      background: #618092;
    }
  }
}

.algolia-wrapper .algolia-autocomplete .ds-dropdown-menu {
  @apply rounded;

  [class^='ds-dataset-'] {
    @apply rounded;
  }
}

.algolia-autocomplete {
  display: block !important;
}

.ds-dropdown-menu {
  line-height: normal;
  width: 100%;
}

.ds-dataset-0 {
  border-radius: 0;
}

.algolia-docsearch-suggestion--wrapper {
  padding-top: 0;

  & .algolia-docsearch-suggestion--subcategory-column {
    color: #35495e;
    height: 100%;
    padding: 10px 15px;
  }

  & .algolia-docsearch-suggestion--content {
    padding: 10px 15px;

    & .algolia-docsearch-suggestion--title {
      & .algolia-docsearch-suggestion--highlight {
        background-color: transparent;
        color: theme('colors.primary.base');
      }
    }

    & .algolia-docsearch-suggestion--text {
      & .algolia-docsearch-suggestion--highlight {
        background-color: transparent;
        box-shadow: inset 0 -2px 0 0 theme('colors.primary.light');
        color: theme('colors.primary.base');
      }
    }
  }
}

.algolia-wrapper {
  ::placeholder {
    @apply opacity-50;
  }
}

.mobile {
  .ds-dropdown-menu {
    min-width: 0 !important;
    width: 100% !important;
  }
}
</style>

<style lang="scss" scoped>
button {
  outline: none;
}
</style>
