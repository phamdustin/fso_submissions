import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const UsersList = () => {

  const [users, setUsers] = useState([])
  
   useEffect(() => {
    const fetchData = async() => {
      axios
        .get('/api/users')
        .then( response => {
          setUsers(response.data)
        })
        .catch(error => {
          console.log('error in getting userlist', error.message)
        })
    }
    fetchData()

  }, []) 

  if (!users) {
    return null
  }
  //console.log(users[0].blogs.length)

  return (
    <div>
      <h1>Users</h1>

      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>)}
        </tbody>
      </Table>
      
    </div>
  )
}
export default UsersList