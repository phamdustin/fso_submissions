import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    upvote(state,action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id? anecdote : changedAnecdote)

    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state,action) {
      return action.payload
    }
  },
})


export const { upvote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
} 

export const voteup = (id) => {
  return async dispatch => {
    const anecdoteResponse = await anecdoteService.getAnecdote(id)
    await anecdoteService.upvote(id, anecdoteResponse)
    dispatch(upvote(id))
  }
}



export default anecdoteSlice.reducer