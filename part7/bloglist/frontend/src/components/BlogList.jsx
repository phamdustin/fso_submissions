import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { addVote, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  console.log(blogs)

  return blogs.map((blog) =>(
    <div key={blog.id}>
      <Blog
        blog={blog}
        addLike={(blog) => dispatch(addVote(blog), dispatch(setNotification(`upvoted ${blog.blog.title}`, 10)))}
        removeBlog={(blog) => dispatch(removeBlog(blog))}
      />
    </div>
  ))
}
export default BlogList