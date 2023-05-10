<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  col: {
    type: [String, Number, Object],
    default: 1
  },
  row: {
    type: [String, Number, Object],
    default: 1
  },
  show: {
    type: Boolean,
    default: false
  },
  noise: {
    type: Boolean,
    default: false
  },
  aspectRatio: {
    type: String,
    default: '2/1'
  }
})

const cardRef = ref<HTMLElement | null>(null)
const { elementX, elementY, isOutside } = useMouseInElement(cardRef)

watch([elementX, elementY], () => {
  cardRef.value?.style.setProperty('--x', `${elementX.value}px`)
  cardRef.value?.style.setProperty('--y', `${elementY.value}px`)
})
</script>

<template>
  <div ref="cardRef" class="card">
    <div class="wrapper">
      <div v-if="noise" class="noise" />
      <slot />
      <div class="content">
        <span v-if="icon" class="icon-wrapper">
          <Icon :name="icon" />
        </span>
        <h3 v-if="$slots.title" class="title">
          <ContentSlot :use="$slots.title" unwrap="p">
            Card title
          </ContentSlot>
        </h3>
        <p v-if="$slots.description" class="description">
          <ContentSlot :use="$slots.description" unwrap="p">
            Card description
          </ContentSlot>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.card': {
    '--col': (props) => props.col,
    '--row': (props) => props.row,
    '--aspectRatio': (props) => props.aspectRatio,

    position: 'relative',
    textAlign: 'center',
    gridColumnEnd: 'span {col}',
    gridRowEnd: 'span {row}',
    borderRadius: '{docus.landing.card.borderRadius}',
    padding: '{docus.landing.card.padding}',
    boxShadow: '{docus.landing.card.boxShadow}',
    borderWidth: '{docus.landing.card.borderWidth}',
    borderStyle: '{docus.landing.card.borderStyle}',
    borderColor: '{docus.landing.card.borderColor}',
    backgroundColor: '{docus.landing.card.backgroundColor}',
    backgroundImage: '{docus.landing.card.backgroundImage}',
    backdropFilter: '{docus.landing.card.backdropFilter}',

    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '0',
      backgroundImage: 'radial-gradient(500px at var(--x) var(--y), rgba({temp.color.gray.400}, 0.3), transparent 60%)',
      backgroundSize: 'auto',
      backgroundOrigin: 'padding-box',
      zIndex: '0',
      borderRadius: 'inherit',
      transition: 'background-image 0.2s ease, opacity 0.2s ease',
      willChange: 'background-image, opacity',
    },

    '.wrapper': {
      width: '100%',
      height: '100%',
      borderRadius: '{docus.landing.card.wrapper.borderRadius}',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '{docus.landing.card.wrapper.backgroundColor}',
      backgroundImage: '{docus.landing.card.wrapper.backgroundImage}',

      '&:after': {
        // backgroundImage: '{docus.landing.card.wrapper.after.backgroundImage}', // TODO bug in tokens with vars
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundOrigin: 'padding-box',
        borderRadius: 'inherit',
        content: '""',
        position: 'absolute',
        inset: '0',
        zIndex: '1',
        transition: 'background-image 0.2s ease, opacity 0.2s ease',
        willChange: 'background-image, opacity',
        '@dark': {
          backgroundImage: 'radial-gradient(500px at var(--x) var(--y), rgba({temp.color.gray.900}, .4) 20%, rgba({temp.color.gray.900}, .4) 100% )'
        }
      }
    },

    '.content': {
      padding: '{docus.landing.card.content.padding}',
      flex: '1',
      position: 'relative',
      zIndex: '2',
    },

    '.icon-wrapper': {
      display: 'inline-block',
      alignSelf: 'flex-start',
      marginBottom: '{docus.landing.card.icon.marginBottom}',
      padding: '{docus.landing.card.icon.padding}',
      borderRadius: '{docus.landing.card.icon.borderRadius}',
      backgroundColor: '{docus.landing.card.icon.backgroundColor}',
      boxShadow: '{docus.landing.card.icon.boxShadow}',
      '.icon': {
        display: 'block',
        width: '{docus.landing.card.icon.width}',
        height: '{docus.landing.card.icon.height}',
      },
    },
    '.title': {
      marginBottom: '{docus.landing.card.title.marginBottom}',
      fontSize: '{docus.landing.card.title.fontSize}',
      lineHeight: '{docus.landing.card.title.lineHeight}',
      fontWeight: '{docus.landing.card.title.fontWeight}',
      letterSpacing: '{docus.landing.card.title.letterSpacing}',
      color: '{docus.landing.card.title.color}'
    },
    '.description': {
      fontSize: '{docus.landing.card.description.fontSize}',
      lineHeight: '{docus.landing.card.description.lineHeight}',
      fontWeight: '{docus.landing.card.description.fontWeight}',
      color: '{docus.landing.card.description.color}',
    },
    '.noise': {
      position: 'absolute',
      inset: '0',
      filter: 'url(#card-noise)',
      background: '{docus.body.backgroundColor}',
      opacity: '{docus.landing.card.noise.opacity}',
      zIndex: '-1',
    }
  }
})
</style>
