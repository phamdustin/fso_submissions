import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [message, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    notificationDispatch({payload:`Created anecdote: ${content}`})
    setTimeout(() => {
      notificationDispatch({ payload: '' })
    },5000)
  } 

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
