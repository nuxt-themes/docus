import { onBeforeUnmount, ref, watch } from '@nuxtjs/composition-api'

export const useScrollspy = () => {
  const observer = ref()
  const visibleHeadings = ref([])
  const activeHeadings = ref([])

  const observerCallback = entries => {
    entries.forEach(entry => {
      const id = entry.target.id
      if (entry.isIntersecting) {
        visibleHeadings.value.push(id)
      } else {
        visibleHeadings.value = visibleHeadings.value.filter(t => t !== id)
      }
    })
  }

  observer.value = new IntersectionObserver(observerCallback)

  const updateHeadings = headings => {
    headings.forEach(heading => {
      observer.value.observe(heading)
    })
  }

  watch(visibleHeadings, (val, oldVal) => {
    if (val.length === 0) {
      activeHeadings.value = oldVal
    } else {
      activeHeadings.value = val
    }
  })

  onBeforeUnmount(() => {
    observer.value.disconnect()
  })

  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings
  }
}
