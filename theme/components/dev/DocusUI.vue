<template>
  <div
    v-show="open"
    class="fixed z-50 overflow-hidden rounded-md shadow group bg-gray-50 dark:bg-gray-800 bottom-6 left-6 w-36"
  >
    <h1 class="flex items-center p-2 font-bold bg-gray-100 dark:bg-gray-700">
      <span class="flex-1">Docus UI</span>
      <IconX
        class="w-4 h-4 transition-opacity opacity-0 cursor-pointer group-hover:opacity-80"
        @click.native="open = false"
      />
    </h1>

    <ul class="p-2">
      <li class="flex items-center pb-1 font-medium">
        <button
          type="button"
          class="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none"
          aria-pressed="false"
          @click="$docus.ui.draft = !$docus.ui.draft"
        >
          <span class="sr-only">Show drafts</span>
          <span
            aria-hidden="true"
            class="absolute w-full h-full rounded-md pointer-events-none"
          ></span>
          <span
            aria-hidden="true"
            :class="drafts ? 'bg-primary-500' : 'bg-gray-200'"
            class="absolute h-4 mx-auto transition-colors duration-200 ease-in-out rounded-full pointer-events-none w-9"
          ></span>
          <span
            aria-hidden="true"
            :class="drafts ? 'translate-x-5' : 'translate-x-0'"
            class="absolute left-0 inline-block w-5 h-5 transition-transform duration-200 ease-in-out transform bg-white border border-gray-200 rounded-full shadow pointer-events-none"
          ></span>
        </button>

        <span
          class="ml-2 cursor-pointer"
          @click="$docus.ui.draft = !$docus.ui.draft"
        >
          Drafts
        </span>
      </li>

      <li class="flex items-center font-medium">
        <button
          type="button"
          class="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none"
          aria-pressed="false"
          @click="$docus.ui.slots = !$docus.ui.slots"
        >
          <span class="sr-only">Show slots</span>
          <span
            aria-hidden="true"
            class="absolute w-full h-full rounded-md pointer-events-none"
          ></span>
          <span
            aria-hidden="true"
            :class="slots ? 'bg-primary-500' : 'bg-gray-200'"
            class="absolute h-4 mx-auto transition-colors duration-200 ease-in-out rounded-full pointer-events-none w-9"
          ></span>
          <span
            aria-hidden="true"
            :class="slots ? 'translate-x-5' : 'translate-x-0'"
            class="absolute left-0 inline-block w-5 h-5 transition-transform duration-200 ease-in-out transform bg-white border border-gray-200 rounded-full shadow pointer-events-none"
          ></span>
        </button>

        <span
          class="ml-2 cursor-pointer"
          @click="$docus.ui.slots = !$docus.ui.slots"
        >
          Slots
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true
    }
  },
  computed: {
    slots() {
      return this.$docus.ui.slots
    },
    drafts() {
      return this.$docus.ui.draft
    }
  }
}
</script>
