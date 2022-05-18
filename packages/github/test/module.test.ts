import { fileURLToPath } from 'url'
import { describe, expect, test } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'

describe('fixtures:basic', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
  })

  test('List releases', async () => {
    const releases = await $fetch('/api/_github/releases')
    expect(releases.length).greaterThan(0)

    releases.forEach((component) => {
      expect(component).ownProperty('name')
      expect(component).ownProperty('date')
      expect(component).ownProperty('body')
      expect(component).ownProperty('v')
      expect(component).ownProperty('url')
      expect(component).ownProperty('author')
    })
  })
})
