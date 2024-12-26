import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        username,password
      })


      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
  
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage("new blog added!")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const handleLogout = async (event) => {
    console.log("Logout button pressed")
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage("Logged out successful")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

      
  } 

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>
          Password <input type="text" value={password} name="Password" onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    return(
      <div>
        <Togglable buttonLabel='Add blog'>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
/*   <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Add Blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title} author={author} url={url} addBlog={addBlog}
            handleTitleChange={({target}) => setTitle(target.value)}
            handleAuthorChange={({target}) => setAuthor(target.value)}
            handleUrlChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
      </div> */
/*       <div>
        <Togglable buttonLabel='Add blog'>
          <BlogForm
              title={title} author={author} url={url} addBlog={addBlog}
              handleTitleChange={({target}) => setTitle(target.value)}
              handleAuthorChange={({target}) => setAuthor(target.value)}
              handleUrlChange={({target}) => setUrl(target.value)}
            />
        </Togglable>
      </div> */

    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>
      {user == null && loginForm()}
      {user !=null && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
        {blogForm()}
        <h2>List of Blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
    
  )
}

export default App