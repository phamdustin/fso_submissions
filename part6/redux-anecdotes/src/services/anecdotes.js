import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAnecdote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  return anecdote.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upvote = async (id, anecdote) => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}

export default { getAll, getAnecdote, createNew, upvote }