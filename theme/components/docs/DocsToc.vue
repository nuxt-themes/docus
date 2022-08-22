<script setup lang="ts">
import { useContent } from '#imports'

const { toc } = useContent()
</script>

<template>
  <div class="flex flex-col space-y-1 sm:space-y-2">
    <template v-if="toc?.links?.length">
      <div class="hidden items-center overflow-hidden text-sm font-semibold lg:flex">
        <span>Table of Contents</span>
      </div>

      <DocsTocLinks :links="toc.links" />
    </template>
  </div>
</template>
