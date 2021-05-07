import { joinURL } from 'ufo'
import { NavItem } from '../../../types/core'

export const useDocusApi = createQuery => {
  function data(path: string) {
    return createQuery(joinURL('/data', path), {}).fetch()
  }

  function search(path: string | any, options?) {
    if (typeof path !== 'string') {
      options = path
      path = ''
    }

    return createQuery(joinURL('/pages', path), options)
  }

  function page(path: string) {
    return this.search(path).fetch()
  }

  function findLink(links: NavItem[], to: string) {
    return links.find(link => link.to === to)
  }

  return {
    data,
    search,
    page,
    findLink
  }
}
