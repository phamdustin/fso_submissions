import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

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