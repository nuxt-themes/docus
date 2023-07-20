<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import appConfig from '#build/app.config'

const { tokens } = appConfig

const heroRef = ref(null) as Ref<HTMLElement | null>
const { height } = useElementBounding(heroRef)

watch(height, (value) => {
  document.documentElement.style.setProperty('--hero-height', `${value}px`)
})

</script>

<template>
  <div ref="heroRef" class="hero relative w-full" :class="[tokens.hero.padding]">
    <span v-if="$slots.root" class="root">
      <slot name="root" />
    </span>
    <div class="layout relative grid" :class="[tokens.hero.layout.gap, tokens.hero.layout.gridTemplateColumns]">
      <div class="content flex flex-col" :class="[tokens.hero.content.gridColumn, tokens.hero.content.alignItems]">
        <p v-if="$slots.announce" class="announce" :class="[tokens.hero.content.announce.marginBottom]">
          <ContentSlot :use="$slots.announce" unwrap="p" />
        </p>

        <h1 class="title" :class="Object.values(tokens.hero.content.title)">
          <ContentSlot :use="$slots.title" unwrap="p">
            Hero Title
          </ContentSlot>
        </h1>

        <p class="description" :class="Object.values(tokens.hero.content.description)">
          <ContentSlot :use="$slots.description" unwrap="p">
            Hero default description.
          </ContentSlot>
        </p>

        <div v-if="$slots.extra" class="extra flex" :class="Object.values(tokens.hero.content.extra)">
          <ContentSlot :use="$slots.extra" unwrap="p" />
        </div>

        <div v-if="$slots.actions" class="actions flex items-center" :class="Object.values(tokens.hero.content.actions)">
          <ContentSlot :use="$slots.actions" unwrap="p" />
        </div>
      </div>

      <div class="support relative flex items-center" :class="[tokens.hero.support.gridColumn]">
        <slot name="support" />
      </div>
    </div>
  </div>
</template>
