import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({
        username,password
      })
      setUser(newUser)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()


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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">Save</button>
      <div>
        
      </div>
    </form>

  )
  return (
    <div>
      <h1>Blogs</h1>
      {user == null && loginForm()}
      {user !=null && <div>
        <p>{user.name} logged in</p>
        {blogForm()}
      </div>
      }

      <div>
        <h2>List of Blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />
      )}
      </div>
    </div>
    
  )
}

export default App