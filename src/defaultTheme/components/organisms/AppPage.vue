<template>
  <div class="flex flex-col w-full pt-0 xl:flex-row xl:pt-10">
    <article class="flex-auto order-last min-w-0 px-4 sm:px-6 mt-4 xl:order-first sm:px-6 xl:mt-0">
      <slot />
    </article>

    <slot name="toc" />
  </div>
</template>
