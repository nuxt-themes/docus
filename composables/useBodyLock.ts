export const useBodyLock = (): any => {
  const { $bodyLock } = useNuxtApp()
  return $bodyLock
}
