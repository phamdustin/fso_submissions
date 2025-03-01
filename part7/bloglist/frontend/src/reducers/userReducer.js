import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const userSlice = createSlice({
  // user.name, user.token, user.username
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state,action) {
      return action.payload
    },
    logoutUser(state,action) {
      return null
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions

export const setUserReducer = (user) => {
  // user.name, user.token, user.username
  console.log(user)
  return async dispatch => {
    dispatch(setUser(user))
  }
}

export const logoutUserReducer = () => {
  console.log("logout reducer")
  return async dispatch => {
    dispatch(logoutUser())
  }
}
export default userSlice.reducer