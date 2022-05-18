import { useState } from '#imports'

export const useRepository = () => {
  const last = useState('docus-last-release')

  const repository = useState('docus-repository')

  return {
    repository,
    last,
  }
}
