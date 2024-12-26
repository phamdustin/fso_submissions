const BlogForm = ({
  title,
  author,
  url,
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <div>
      <h2>Submit new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />    
        </div>
        <div>
          Author: <input 
            value={author} 
            name="Author" 
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url: <input
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default BlogForm