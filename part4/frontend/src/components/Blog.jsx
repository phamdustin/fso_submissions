const Blog = ({ blog }) => {

  return (
    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      
    </div>  
  )
}

export default Blog