<template>
  <div
    class="
      lg:inset-0
      z-90
      lg:-mb-0
      lg:static
      lg:h-auto
      lg:overflow-y-visible
      lg:pt-0
      lg:w-1/4
      lg:block
    "
  >
    <div
      class="
        lg:overflow-y-auto
        lg:scrolling-touch
        lg:h-auto
        lg:block
        lg:sticky
        lg:top-24
      "
    >
      <div
        class="
          flex flex-col
          px-4
          pt-8
          justify-start
          xl:overflow-y-auto
          overflow-x-hidden
          lg:pr-0
          lg:pl-8
          sticky?lg:max-h-(screen-24)
        "
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.affix {
  height: calc(100vh - 6rem);
  top: 6rem;
}
</style>
