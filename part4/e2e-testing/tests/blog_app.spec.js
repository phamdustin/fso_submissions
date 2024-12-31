const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "mluukkai",
        name: "tester",
        password: "salainen"
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened and login form is visible', async ({ page }) => {
    

    const locator = await page.getByText('Blog')
    await expect(locator).toBeVisible()
    await expect(page.getByTestId('loginForm')).toBeVisible()

  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('tester logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('incorrectPassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe.only('When logged in', () => {
    beforeEach( async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('tester logged in')).toBeVisible()
    })

    test.only('new blog can be created', async({ page }) => {
      await page.getByText('Add blog').click()
      await page.getByTestId('blogform-title').fill('How to submit a new blog')
      await page.getByTestId('blogform-author').fill('Admin')
      await page.getByTestId('blogform-url').fill('tumblr.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      await expect(page.getByText('How to submit a new blog')).toBeVisible()
    })

    test.only('blog can be liked', async ({ page }) => {
      await page.getByText('Add blog').click()
      await page.getByTestId('blogform-title').fill('How to submit a new blog')
      await page.getByTestId('blogform-author').fill('Admin')
      await page.getByTestId('blogform-url').fill('tumblr.com')
      await page.getByRole('button', { name: 'Submit' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('like sent!')).toBeVisible()

    })
  })
})
