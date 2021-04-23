import Hookable from 'hookable'

let _hookable: Hookable
export default function useHooks() {
  if (!_hookable) {
    _hookable = new Hookable()
  }
  return _hookable
}
