import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
      <ul>{user[0].blogs.map((blog) => <li>{blog.title}</li>)}</ul>
    </div>
  )
}
export default UsersBlogs