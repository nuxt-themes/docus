import { useNuxtApp } from '#imports'

export const useDocSearch = () => {
  const { $docSearch } = useNuxtApp()

  return $docSearch
}
