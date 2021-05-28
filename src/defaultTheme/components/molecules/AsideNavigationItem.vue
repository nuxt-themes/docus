<template>
  <li :class="{ active: isActive }">
    <h5
      v-if="title"
      class="py-2 text-base font-semibold text-gray-900 cursor-pointer dark:text-gray-100"
      :class="[isActive ? '' : 'hover:text-gray-600 dark:hover:text-gray-400']"
      @click="collapse"
    >
      {{ title }}
    </h5>
    <ul v-if="!isCollapse || isActive" class="mb-2 ml-2">
      <li v-for="doc of docs" :key="doc.to">
        <NuxtLink
          :to="$contentLocalePath(doc.to)"
          class="block w-full"
          :class="[
            $docus.isLinkActive(doc.to)
              ? 'text-primary-500 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400'
          ]"
        >
          <span
            class="relative inline-flex items-center justify-between px-2 py-1 rounded-md"
            :class="[$docus.isLinkActive(doc.to) ? 'bg-primary-50 dark:bg-primary-900' : '']"
          >
            <InjectComponent
              v-if="doc.icon"
              :component="doc.icon"
              class="inline-flex mr-2 w-5 h-5 justify-center items-center text-1.2rem"
            >
              {{ doc.icon }}
            </InjectComponent>

            <span>
              {{ doc.navigation.title }}
            </span>

            <ClientOnly>
              <span v-if="doc.draft" class="w-2 h-2 ml-2 bg-yellow-500 rounded-full opacity-75" />
              <span
                v-else-if="isDocumentNew(doc)"
                class="w-2 h-2 ml-2 rounded-full opacity-75 animate-pulse bg-primary-500"
              />
            </ClientOnly>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    docs: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { $docus } = useContext()

    const isCollapse = ref(false)

    const isActive = computed(() => props.docs.some(document => $docus.isLinkActive(document.to)))

    const collapse = () => {
      if (isActive.value) {
        return
      }

      isCollapse.value = !isCollapse.value
    }

    const isDocumentNew = document => {
      if (process.server) return

      if (!document.version || document.version <= 0) return

      const version = localStorage.getItem(`document-${document.slug}-version`)

      if (document.version > Number(version)) return true

      return false
    }

    return {
      collapse,
      isActive,
      isCollapse,
      isDocumentNew
    }
  }
})
</script>
