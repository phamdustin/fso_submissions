import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

// Tests that the component renders the blog's title and author, but the rest will not be rendered
test('renders content', () => {
  const blog = {
    title: 'Rendering test',
    author: 'admin',
    url: 'wontBeRendered.com',
    likes: 7,
    user: {
      name: 'admin2.0'
    }
  }

  render(<Blog blog={blog} />)
  const element1 = screen.queryByText('Rendering test by: admin')
  expect(element1).toBeDefined()
  const element2 = screen.queryByText('wontBeRendered.com')
  expect(element2).toBeNull()
  const element3 = screen.queryByText('7')
  expect(element3).toBeNull()
})

test('checks that url and likes will be rendered after clicking the button', async() => {
  const blog = {
    title: 'Rendering test',
    author: 'admin',
    url: 'willBeRendered.com',
    likes: 7,
    user: {
      name: 'admin2.0'
    }
  }


  render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const element = screen.getByText('willBeRendered.com')
  expect(element).toBeDefined()
  const element2 = screen.queryByText('7')
  expect(element2).toBeDefined()
})

test('checks that event handler is called twice when clicked twice', async() => {
  const blog = {
    title: 'Rendering test',
    author: 'admin',
    url: 'willBeRendered.com',
    likes: 7,
    user: {
      name: 'admin2.0'
    }
  }

  const mockHandler = vi.fn()
  render(
    <Blog blog={blog} addLike={mockHandler}/>
  )
  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('BlogForm updates parent state and calls onSubmit', async () => {
  // The test checks that the form calls the event handler it received as props with the right details when a new blog is created.
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Submit')

  await user.type(inputs[0], 'testing...')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing...')
})