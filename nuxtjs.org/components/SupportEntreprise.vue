<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
    <h2
      class="
        text-center text-3xl
        sm:text-4xl
        font-semibold
        tracking-tight
        font-extrabold
        text-secondary-darker
        dark:text-white
      "
    >
      <Markdown slot="title" unwrap="span" />
    </h2>
    <p class="text-xl text-secondary-darker dark:text-white text-center mt-2 mb-4">
      <Markdown slot="description" unwrap="span" />
    </p>
    <p class="text-center md:w-2/3 mx-auto">
      <Markdown slot="subdescription" unwrap="span" />
    </p>
    <div class="flex items-center justify-center mt-8">
      <SectionButton to="#" size="md" class="bg-primary text-gray-800 hover:bg-green-300 focus:bg-green-300 block">
        <Markdown :node="$scopedSlots.cta" unwrap="span" />
      </SectionButton>
      <SectionButton
        to="#"
        size="md"
        class="bg-white text-gray-800 hover:bg-gray-200 focus:bg-gray-300 border-gray-300 border-2 block ml-4"
      >
        <Markdown :node="$scopedSlots.secondaryCta" unwrap="span" />
      </SectionButton>
    </div>
  </div>
</template>
