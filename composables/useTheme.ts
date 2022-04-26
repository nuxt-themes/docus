import { useRuntimeConfig } from '#imports'

export const useTheme = () => {
  const { theme } = useRuntimeConfig()

  return theme
}

export const classNames = (...args: any[]) => {
  const classes = args.filter(Boolean).join(' ')
  return classes.length ? classes : undefined
}
