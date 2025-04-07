import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const UsersBlogs = () => {
  const {id}  = useParams()

  const userList = useSelector(state => state.userList)
  console.log(userList)

  const user = userList.filter((user) => user.id === id)
  console.log(user[0].id)
  return(
    <div>
      <h1>{user[0].name}</h1>
      <h5>Added blogs</h5>
      <ul>{user[0].blogs.map((blog) => <li><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}</ul>
    </div>
  )
}
export default UsersBlogs