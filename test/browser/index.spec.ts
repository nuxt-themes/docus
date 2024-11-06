import { expect, test } from '@nuxt/test-utils/playwright'

test('home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot()
})
