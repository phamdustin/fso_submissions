import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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




  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage("new blog added!")
        setTitle('')
        setAuthor('')
        setUrl('')
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title: <input
          value={title}
          name="Title"
          onChange={({target}) => setTitle(target.value)}
        />    
      </div>
      <div>
        Author: <input 
          value={author} 
          name="Author" 
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url: <input
          value={url}
          name="Url"
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>

  )
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>
      {user == null && loginForm()}
      {user !=null && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
        <h2>Submit new blog</h2>
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