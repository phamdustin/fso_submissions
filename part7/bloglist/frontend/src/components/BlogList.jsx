import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import blogReducer from '../reducers/blogReducer'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)

  return blogs.map((blog) =>(
    <div key={blog.id}>
      <Blog
        blog={blog}
      />
    </div>
  ))
}
export default BlogList