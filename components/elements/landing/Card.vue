<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="card">
    <Icon v-if="icon" :name="icon" />
    <slot />
    <div>
      <h3 class="title">
        <ContentSlot :use="$slots.title" unwrap="p">
          Card title
        </ContentSlot>
      </h3>
      <p class="description">
        <ContentSlot :use="$slots.description" unwrap="p">
          Card description
        </ContentSlot>
      </p>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.card': {
    display: 'block',
    position: 'relative',
    width: '100%',
    padding: '{elements.card.padding}', 
    borderRadius: '{elements.card.borderRadius}', 
    borderWidth: '{elements.card.borderWidth}', 
    borderStyle: '{elements.card.borderStyle}', 
    borderColor: '{elements.card.borderColor}',  
    backgroundColor: '{elements.card.backgroundColor}', 
    backdropFilter: '{elements.card.backdropFilter}', 
    '.icon': {
      display: 'inline-block',
      marginBottom: '{elements.card.icon.marginBottom}',  
      width: '{elements.card.icon.width}', 
      height: '{elements.card.icon.height}' 
    },
    '.title': {
      marginBottom: '{elements.card.title.marginBottom}',  
      fontSize: '{elements.card.title.fontSize}', 
      lineHeight: '{elements.card.title.lineHeight}', 
      fontWeight: '{elements.card.title.fontWeight}',  
      color: '{elements.card.title.color}' 
    },
    '.description': {
      fontSize: '{elements.card.description.fontSize}', 
      lineHeight: '{elements.card.description.lineHeight}', 
      fontWeight: '{elements.card.description.fontWeight}',  
      color: '{elements.card.description.color}' 
    }
  }
})
</style>
