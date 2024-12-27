const Blog = ({ blog, addLike }) => {

  return (
    
    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => addLike({blog})}>like</button></p>
      <p>{blog.user.name}</p>
    </div>  
  )
}

export default Blog