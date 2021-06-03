export default function (to, from, savedPosition) {
  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    return savedPosition
  }
  return { x: 0, y: 0 }
}
