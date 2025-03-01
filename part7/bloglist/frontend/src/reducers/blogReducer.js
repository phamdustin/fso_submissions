import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addingBlog(state,action) {
      state.push(action.payload)
    },
    upvote(state,action) {
      const originalBlog = action.payload
      const changedBlog = { ...originalBlog,
        votes: originalBlog.votes + 1 }
      return state.map(blog => blog.id !== originalBlog.id? originalBlog : changedBlog)
    },
    setBlogs(state,action) {
      return action.payload

    }
  },

})

export const { addingBlog, upvote, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
    catch (error) {
      console.error('failed to fetch blogs', error)
    }

  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(addingBlog(newBlog))
  }
}
export const addLike = (blog) => {
  return async dispatch => {
    await blogService.addLike(blog)
    dispatch(upvote(blog))
  }
}

export default blogSlice.reducer