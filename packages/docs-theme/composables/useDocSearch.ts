import { ref, useNuxtApp } from '#imports'

export const useDocSearch = () => {
  const { $docSearch } = useNuxtApp()

  if (!$docSearch) {
    return {
      hasDocSearch: ref(false),
    }
  }

  return $docSearch
}
