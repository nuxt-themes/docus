export const useBodyLock = () => {
  const { $bodyLock } = useNuxtApp()

  return $bodyLock
}
