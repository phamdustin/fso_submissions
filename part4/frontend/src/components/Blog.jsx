import PropTypes from 'prop-types'


const Blog = ({ blog, addLike, removeBlog }) => {

  return (

    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => addLike({ blog })}>like</button></p>
      <p>{blog.user.name}</p>
      <button onClick={() => removeBlog({ blog })}>remove</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}
export default Blog