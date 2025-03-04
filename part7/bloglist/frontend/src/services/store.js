import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer, { setBlogs } from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import userListReducer, { initializeUserList } from '../reducers/userListReducer'

import blogService from './blogs'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    userList: userListReducer
  }
})

blogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)


export default store