import { onBeforeMount, onBeforeUnmount, Ref, ref, watch } from '@nuxtjs/composition-api'

/**
 * Scrollspy allows you to watch visible headings in a specific page.
 * Useful for table of contents live style updates.
 */
export function useScrollspy() {
  const observer = ref() as Ref<IntersectionObserver>
  const visibleHeadings = ref([]) as Ref<string[]>
  const activeHeadings = ref([]) as Ref<string[]>

  const observerCallback = (entries: IntersectionObserverEntry[]) =>
    entries.forEach(entry => {
      const id = entry.target.id

      if (entry.isIntersecting) {
        visibleHeadings.value.push(id)
      } else {
        visibleHeadings.value = visibleHeadings.value.filter(t => t !== id)
      }
    })

  const updateHeadings = (headings: HTMLElement[]) =>
    headings.forEach(heading => {
      observer.value.observe(heading)
    })

  watch(visibleHeadings, (val, oldVal) => {
    if (val.length === 0) {
      activeHeadings.value = oldVal
    } else {
      activeHeadings.value = val
    }
  })

  // Create intersection observer
  onBeforeMount(() => (observer.value = new IntersectionObserver(observerCallback)))

  // Destroy it
  onBeforeUnmount(observer.value.disconnect)

  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings
  }
}
