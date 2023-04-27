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
    type: [String, Number],
    default: 1
  },
  show: {
    type: Boolean,
    default: false
  },
  noise: {
    type: Boolean,
    default: true
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

    textAlign: 'center',

    gridColumnEnd: 'span {col}',
    gridRowEnd: 'span {row}',

    backgroundImage: 'linear-gradient(135deg, rgba({temp.color.gray.400}, 0.15), rgba({temp.color.gray.600},.08))',
    borderRadius: '{radii.sm}',
    padding: '1px',
    position: 'relative',
    // boxShadow: '{elements.card.boxShadow}',

    // display: 'flex',
    // width: '100%',
    // height: '100%',
    // borderRadius: '{elements.card.borderRadius}',
    // borderWidth: '{elements.card.borderWidth}',
    // borderStyle: '{elements.card.borderStyle}',
    // borderColor: '{elements.card.borderColor}',
    // backgroundColor: '{elements.card.backgroundColor}',
    // backgroundImage: 'linear-gradient(180deg, {color.gray.800} 0%, {color.gray.900} 100%)',
    // backdropFilter: '{elements.card.backdropFilter}',
    // overflow: 'hidden',

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
      borderRadius: '{radii.xs}',
      position: 'relative',
      overflow: 'hidden',

      // display: 'flex',
      // flexDirection: '{flexDirection}',
      // justifyContent: 'space-between',
      // alignItems: '{alignItems}',
      backgroundImage: '{elements.card.wrapper.backgroundImage}',

      '&:after': {
        backgroundImage: 'radial-gradient(500px at var(--x) var(--y), rgba({temp.color.gray.700}, .2) 40%, transparent 80% )',
        backgroundSize: 'auto',
        backgroundOrigin: 'padding-box',
        borderRadius: 'inherit',
        content: '""',
        position: 'absolute',
        inset: '0',
        zIndex: '1',
        transition: 'background-image 0.2s ease, opacity 0.2s ease',
        willChange: 'background-image, opacity',
      }
    },

    '.content': {
      // position: 'absolute',
      padding: '{elements.card.padding}',
      flex: '1',
      position: 'relative',
      zIndex: '2',

    },

    '.icon-wrapper': {
      display: 'inline-block',
      alignSelf: 'flex-start',
      marginBottom: '{elements.card.icon.marginBottom}',
      padding: '{elements.card.icon.padding}',
      borderRadius: '{elements.card.icon.borderRadius}',
      backgroundColor: '{elements.card.icon.backgroundColor}',
      boxShadow: '{elements.card.icon.boxShadow}',
      // boxShadow: 'inset 0 0 2px 1px {color.gray.900}',
      '.icon': {
        display: 'block',
        width: '{elements.card.icon.width}',
        height: '{elements.card.icon.height}',
      },
    },
    '.title': {
      marginBottom: '{elements.card.title.marginBottom}',
      fontSize: '{elements.card.title.fontSize}',
      lineHeight: '{elements.card.title.lineHeight}',
      fontWeight: '{elements.card.title.fontWeight}',
      letterSpacing: '{elements.card.title.letterSpacing}',
      color: '{elements.card.title.color}'
    },
    '.description': {
      fontSize: '{elements.card.description.fontSize}',
      lineHeight: '{elements.card.description.lineHeight}',
      fontWeight: '{elements.card.description.fontWeight}',
      color: '{elements.card.description.color}',
    },
    '.noise': {
      position: 'absolute',
      top: '1px',
      left: '1px',
      right: '1px',
      bottom: '1px',
      filter: 'url(#card-noise)',
      background: '{docus.body.backgroundColor}',
      // backgroundImage: 'radial-gradient(circle at var(--x) var(--y), red 4%, transparent 21%, red 36%)',
      // width: '100%',
      // height: '100%',
      opacity: '{elements.card.noise.opacity}',
      zIndex: '-1',
    }
  }
})
</style>
