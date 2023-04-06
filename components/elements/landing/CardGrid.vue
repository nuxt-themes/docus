<template>
  <section class="card-grid">
    <ContentSlot :use="$slots.root" />

    <h2 v-if="$slots.title" class="title">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <div class="layout">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="ts">
css({
  '.card-grid': {
    position: 'relative',
    paddingBottom: '{elements.cardGrid.paddingBottom}', 
    '.title': {
      marginBottom: '{elements.cardGrid.title.marginBottom}', 
      fontSize: '{elements.cardGrid.title.fontSize}', 
      lineHeight: '{elements.cardGrid.title.lineHeight}',  
      fontWeight: '{elements.cardGrid.title.fontWeight}',  
      letterSpacing: '{elements.cardGrid.title.letterSpacing}', 
      color: '{elements.cardGrid.title.color}',  
    },
    '.layout': {
      display: 'grid',
      gap: '{elements.cardGrid.layout.gap}', 
      textAlign: 'start',
      gridTemplateColumns: '{elements.cardGrid.layout.gridTemplateColumns}', 
    }
  }
})
</style>
