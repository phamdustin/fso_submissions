const Blog = ({ blog, addLike, removeBlog }) => {

  return (
    
    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => addLike({blog})}>like</button></p>
      <p>{blog.user.name}</p>
      <button onClick={() => removeBlog({blog})}>remove</button>
    </div>  
  )
}

export default Blog