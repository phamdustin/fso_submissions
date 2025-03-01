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
      console.log(`upvoting ${action.payload}`)
      const changedBlog = action.payload
      return state.map(blog => blog.id !== changedBlog.id? blog : changedBlog)
    },
    setBlogs(state,action) {
      return action.payload

    },
    removeBlogAction(state,action) {
      console.log(`removing blog in reducer ${action.payload}`)
      const id = action.payload
      return state.filter((blog) => blog.id !== action.payload)
    }
  },

})

export const { addingBlog, upvote, setBlogs, removeBlogAction } = blogSlice.actions

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
export const addVote = (blogObject) => {
  console.log("addVote action started")
  console.log(blogObject)
  const newBlog = {
    author: blogObject.blog.author,
    id: blogObject.blog.id,
    likes: blogObject.blog.likes + 1,
    title: blogObject.blog.title,
    url: blogObject.blog.url,
    user: {
      _id: blogObject.blog.user.id,
      name: blogObject.blog.user.name,
      username: blogObject.blog.user.username,
    },
  } 
  return async dispatch => {
    try {
      console.log("In addVote of reducer")
      const response = await blogService.addLike(newBlog)
      console.log(response)
      dispatch(upvote(newBlog))
    }
    catch (error) {
      console.error('failed to add like', error)
    }
  }
}

export const removeBlog = (blogObject) => {
  const id = blogObject.blog.id
  return async dispatch => {
    try{
      blogService.deleteBlog(id)
      console.log('hi')
      dispatch(removeBlogAction(id))
    }
    catch (error) {
      console.error('failed to remove blog', error)
    }
  }
}
export default blogSlice.reducer