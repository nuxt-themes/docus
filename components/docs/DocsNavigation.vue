<script setup lang="ts">
import type { PropType } from 'vue'
import appConfig from '#build/app.config'

const { tokens } = appConfig

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => []
  },
  level: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: null
  },
  parent: {
    type: Object as PropType<any>,
    default: null
  }
})

const route = useRoute()
const { config } = useDocus()

const collapsedMap = useState(`docus-docs-aside-collapse-map-${props.parent?._path || '/'}`, () => {
  if (props.level === 0) {
    return {}
  }
  return (props.links as any [])
    .filter(link => !!link.children)
    .reduce((map, link) => {
      map[link._path] = true
      return map
    }, {})
})

const isActive = (link: any) => {
  return route.path === link._path
}

const isCollapsed = (link: any) => {
  if (link.children) {
    // Directory has been toggled manually, use its state
    if (typeof collapsedMap.value[link._path] !== 'undefined') {
      return collapsedMap.value[link._path]
    }

    // Check if aside.collapsed has been set in YML
    if ([true, false].includes(link?.aside?.collapsed)) { return link.aside.collapsed }

    // Return value grabbed from the link
    if (link?.collapsed) { return link?.collapsed }

    if (config?.value?.aside?.collapsed) { return config.value.aside?.collapsed }
  }

  return false
}

const toggleCollapse = (link: any) => (collapsedMap.value[link._path] = !isCollapsed(link))

// const hasNesting = computed(() => props.links.some((link: any) => link.children))
</script>

<template>
  <ul class="docs-aside-tree">
    <li
      v-for="link in links"
      :key="link._path"
      :class="[
        (link?.navigation?.icon || link.icon) && 'has-icon',
        parent?.icon && 'has-parent-icon',
        link.children && 'has-children',
        (level > 0 && !link.children) && tokens.docsNavigation.item.bordered,
        isActive(link) && 'active',
      ]"
    >
      <component
        :is="config.aside?.collapsible ? 'button' : 'h5'"
        v-if="link.children"
        class="title-collapsible-button flex items-center justify-between w-full"
        :class="[tokens.docsNavigation.collapsible.root]"
        @click="() => config.aside?.collapsible && toggleCollapse(link)"
      >
        <span
          class="content flex items-center"
          :class="[tokens.docsNavigation.collapsible.content]"
        >
          <Icon
            v-if="link?.navigation?.icon || link.icon"
            :name="link?.navigation?.icon || link.icon"
            class="icon"
          />
          <span>{{ link?.navigation?.title || link.title || link._path }}</span>
        </span>
        <span v-if="config.aside?.collapsible">
          <Icon
            :name="isCollapsed(link) ? 'lucide:chevrons-up-down' : 'lucide:chevrons-down-up'"
            class="collapsible-icon"
            :class="[tokens.docsNavigation.collapsible.icon]"
          />
        </span>
      </component>

      <NuxtLink
        v-else
        :to="link.redirect ? link.redirect : link._path"
        class="link flex items-center justify-between"
        :exact="link.exact"
        :class="[
          isActive(link) && 'active',
          tokens.docsNavigation.link
        ]"
      >
        <span class="content inline-flex items-center">
          <Icon
            v-if="link?.navigation?.icon || link.icon"
            :name="link?.navigation?.icon || link.icon"
            class="icon"
          />
          <span>{{ link?.navigation?.title || link.title || link._path }}</span>
        </span>
      </NuxtLink>

      <DocsNavigation
        v-show="!isCollapsed(link)"
        v-if="link.children?.length && (max === null || level + 1 < max)"
        :links="link.children"
        :level="level + 1"
        :parent="link"
        :max="max"
        class="recursive"
        :class="[tokens.docsNavigation.recursive]"
      />
    </li>
  </ul>
</template>
