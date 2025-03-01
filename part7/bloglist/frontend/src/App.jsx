import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import BlogList from './components/BlogList.jsx'

import { setUserReducer, logoutUserReducer } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserReducer(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log(user.token)
      dispatch(setUserReducer(user))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials. Try again', 5))
    }
  }
  const addBlog = (blogObject) => {
    console.log(blogObject)
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`blog added: ${blogObject.title}`, 5))
  }

  const removeBlog = (blogObject) => {
    const blogId = blogObject.blog.id
    if (blogObject.blog.user.username === user.username) {
      if (window.confirm(`Remove blog ${blogObject.blog.title}?`)) {
        blogService.deleteBlog(blogId).then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== blogId))
          dispatch(setNotification('blog removed', 5))
        })
      }
    } else {
      window.confirm('ERROR: Incorrect User ')
    }
  }

  const handleLogout = async (event) => {
    console.log('Logout button pressed')
    dispatch(logoutUserReducer())
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('Logout successful!', 5))
  }
  const loginForm = () => (
    <form onSubmit={handleLogin} data-testid="loginForm">
      <div>
        Username{' '}
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password{' '}
        <input
          data-testid="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Add blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {user === null && loginForm()}
      {user !== null && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>logout</button>{' '}
          </p>
          {blogForm()}
          <h2>List of Blogs</h2>
          {/* {printBlogs()} */}
          <BlogList />
          {/* {blogs.map(blog => <Blog key={blog.id} blog={blog} />)} */}
        </div>

      )}

    </div>
  )
}

export default App
