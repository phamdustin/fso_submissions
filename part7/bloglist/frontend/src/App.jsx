import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {

  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials. Try again', 5))
    }
  }
  const printBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)

    return blogs.map((blog) => (
      <div key={blog.id}>
        <Blog
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
          loggedUser={user.username}
        />
      </div>
    ))
  }
  const addBlog = (blogObject) => {
    console.log(blogObject)
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })
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

  const addLike = (blogObject) => {
    console.log(blogObject.blog)
    const newBlog = {
      author: blogObject.blog.author,
      id: blogObject.blog.id,
      likes: blogObject.blog.likes + 1,
      title: blogObject.blog.title,
      url: blogObject.blog.url,
      user: {
        _id: blogObject.blog.user.id,
        name: blogObject.blog.user.name,
        username: blogObject.blog.user.username,
      },

    }
    dispatch(setNotification(`upvoted ${blogObject.blog.title}`, 10))

    blogService.addLike(newBlog).then((returnedBlog) => {
      const index = blogs.findIndex((blog) => blog.id === newBlog.id)
      if (index !== -1) {
        setBlogs((prevArray) =>
          prevArray.map((blog) =>
            blog.id === newBlog.id ? { ...blog, likes: newBlog.likes } : blog,
          ),
        )
      }
    })
  }
  const handleLogout = async (event) => {
    console.log('Logout button pressed')
    setUser(null)
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
          {printBlogs()}
          {/* {blogs.map(blog => <Blog key={blog.id} blog={blog} />)} */}
        </div>
      )}
    </div>
  )
}

export default App
