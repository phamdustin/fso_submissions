import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle= {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (

    <div style={blogStyle} className='blog'>
      <div>
      <p>{blog.title} by: {blog.author}
        <button onClick={toggleVisible}>{visible? 'Hide': 'View'}</button>
      </p>
      </div>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => addLike({ blog })}>like</button></p>
          <p>{blog.user.name}</p>
          <button onClick={() => removeBlog({ blog })}>remove</button>
        </div>
      )
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}
export default Blog