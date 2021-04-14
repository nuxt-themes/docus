export function convertPropToPixels(prop) {
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.opacity = 0
  tempDiv.style.height = getComputedStyle(document.documentElement).getPropertyValue(prop)
  document.body.appendChild(tempDiv)
  const pixels = parseInt(getComputedStyle(tempDiv).height)
  document.body.removeChild(tempDiv)
  return pixels
}

export function scrollToHeading(id, scrollMarginCssVar) {
  // use replaceState to prevent page jusmp when adding hash
  history.replaceState({}, '', '#' + id)

  // do not remove setTimeout (does not work in Safari)
  setTimeout(() => {
    const offset = document.querySelector(`#${id}`).offsetTop - parseInt(convertPropToPixels(scrollMarginCssVar))
    window.scrollTo(0, offset)
  })
}
