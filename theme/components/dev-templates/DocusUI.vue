<template>
  <div class="fixed shadow bg-gray-50 dark:bg-gray-800 bottom-6 left-6 w-36">
    <h1 class="p-2 font-bold bg-gray-100 dark:bg-gray-700">Docus UI</h1>
    <ul class="p-2">
      <li class="flex items-center font-medium">
        <button type="button" class="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-pressed="false" @click="$docus.ui.slots = !$docus.ui.slots">
          <span class="sr-only">Show slots</span>
          <span aria-hidden="true" class="absolute w-full h-full rounded-md pointer-events-none"></span>
          <span aria-hidden="true" :class="slots ? 'bg-primary-500' : 'bg-gray-200'" class="absolute h-4 mx-auto transition-colors duration-200 ease-in-out rounded-full pointer-events-none w-9"></span>
          <span aria-hidden="true" :class="slots ? 'translate-x-5' : 'translate-x-0'" class="absolute left-0 inline-block w-5 h-5 transition-transform duration-200 ease-in-out transform translate-x-0 bg-white border border-gray-200 rounded-full shadow pointer-events-none ring-0"></span>
        </button>
        <span class="ml-2 cursor-pointer" @click="$docus.ui.slots = !$docus.ui.slots">Slots</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    slots () {
      return this.$docus.ui.slots
    }
  }
}
</script>
