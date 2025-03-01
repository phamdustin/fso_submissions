import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer, { setBlogs } from '../reducers/blogReducer'

import blogService from './blogs'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  }
})

blogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)

export default store