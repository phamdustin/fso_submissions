const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

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
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('tester logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe.only('When logged in', () => {
    beforeEach( async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('tester logged in')).toBeVisible()
    })

    test.only('new blog can be created', async({ page }) => {
      await createNote(page, 'How to submit a new blog', 'Admin', 'tumblr.com')

      await expect(page.getByText('How to submit a new blog')).toBeVisible()
    })

    test.only('blog can be liked', async ({ page }) => {
      // Exercise 5.20 
      await createNote(page, 'How to submit a new blog', 'Admin', 'tumblr.com')

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('like sent!')).toBeVisible()

    })

    test.only('blog can be deleted by same user', async ({ page }) => {
      // Exercise 5.21
      await createNote(page, 'How to submit a new blog', 'Admin', 'tumblr.com')

      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async dialog => { // initiating event listener
        await dialog.accept() // will auto accept any dialogs that pops up
      }); 
      await page.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.getByText('blog removed')).toBeVisible()
    })

    test.only('blog remove button can only be seen by the creator', async ({ page, request }) => {
      await createNote(page, 'Cant delete this one', 'Admin', 'tumblr.com')
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: "asasa",
          name: "cannot see",
          password: "salainen"
        }
      })
      await page.goto('http://localhost:5173')
      await page.getByText('logout').click()
      await loginWith(page, 'asasa', 'salainen')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })
  })
})
