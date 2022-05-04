<template>
  <main class="relative pb-4 sm:pb-6 lg:py-8">
    <Container padded>
      <div class="relative grid grid-cols-10 gap-8">
        <aside class="col-span-2 hidden overflow-y-auto overflow-x-hidden pb-8 lg:sticky lg:top-16 lg:-mt-8 lg:block lg:max-h-[calc(100vh-64px)] lg:self-start lg:pb-0 lg:pt-8">
          <slot name="aside" />
        </aside>

        <div
          class="relative"
          :class="{
            'col-span-10 lg:col-span-8': !!$slots.aside,
            'col-span-10': !$slots.aside,
          }"
        >
          <slot />
        </div>
      </div>
    </Container>
  </main>
</template>
