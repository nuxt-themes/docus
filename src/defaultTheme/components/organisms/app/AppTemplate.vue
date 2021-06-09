<template>
  <div class="lg:flex" :class="fluid ? '' : 'd-container'">
    <slot v-if="true" name="aside"><AppAside /></slot>

    <div class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
      <slot />
    </div>
  </div>
</template>
