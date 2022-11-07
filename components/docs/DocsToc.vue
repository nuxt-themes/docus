<script setup lang="ts">
const { toc } = useContent()
const emit = defineEmits(['move'])
</script>

<template>
  <div class="flex flex-col space-y-1 sm:space-y-2">
    <template v-if="toc?.links?.length">
      <div class="items-center hidden overflow-hidden text-sm font-semibold lg:flex">
        <span>Table of Contents</span>
      </div>

      <DocsTocLinks :links="toc.links" @move="emit('move')" />
    </template>
  </div>
</template>
