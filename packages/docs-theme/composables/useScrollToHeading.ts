import routerOptions from '../app/router.options'

export const useConvertPropToPixels = (prop: string): number => {
  const tempDiv = document.createElement('div')

  tempDiv.style.position = 'absolute'
  tempDiv.style.opacity = '0'
  tempDiv.style.height = getComputedStyle(document.documentElement).getPropertyValue(prop)

  document.body.appendChild(tempDiv)

  const pixels = parseInt(getComputedStyle(tempDiv).height)

  document.body.removeChild(tempDiv)

  return pixels
}

export const useScrollToHeading = (id: string, scrollMarginCssVar: string) => {
  // Use replaceState to prevent page jump when adding hash
  // history.replaceState({}, '', `#${id}`)
  const router = useRouter()

  router.push(`#${id}`)

  // Do not remove setTimeout (does not work in Safari)
  // setTimeout(() => {
  //   window.scrollTo({
  //     el: `#${id}`,
  //     left: 0,
  //     behavior: 'smooth',
  //   })
  // })
}
