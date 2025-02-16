import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'

import anecdoteService from './anecdotes'


const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes => 
    store.dispatch(setAnecdotes(anecdotes))
  )

export default store