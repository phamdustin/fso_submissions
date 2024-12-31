const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened and login form is visible', async ({ page }) => {
    

    const locator = await page.getByText('Blog')
    await expect(locator).toBeVisible()
    await expect(page.getByTestId('loginForm')).toBeVisible()

  })
})
