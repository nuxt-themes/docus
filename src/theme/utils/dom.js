export function convertPropToPixels (prop) {
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.opacity = 0
  tempDiv.style.height = getComputedStyle(document.documentElement)
    .getPropertyValue(prop)
  document.body.appendChild(tempDiv)
  const pixels = parseInt(getComputedStyle(tempDiv).height)
  document.body.removeChild(tempDiv)
  return pixels
}
