import { useState } from '#imports'

export const useMenu = () => {
  // Menu visible reference
  const visible = useState('menu-visible', () => false)

  // Open the menu
  const open = () => (visible.value = true)

  // Close the menu
  const close = () => (visible.value = false)

  // Toggle the menu (useful for one-off buttons)
  const toggle = () => (visible.value = !visible.value)

  return {
    open,
    close,
    toggle,
    visible,
  }
}
