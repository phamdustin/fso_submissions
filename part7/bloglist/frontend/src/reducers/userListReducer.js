import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUsers(state,action) {
      return action.payload
    }
  }
})

export const { setUsers } = userListSlice.actions

export const initializeUserList = () => {
  return async dispatch => {
    axios
      .get('/api/users')
      .then( response => {
        dispatch(setUsers(response.data))
      })
      .catch(error => {
        console.log('error in getting userlist', error.message)
      })
  }
}

export default userListSlice.reducer