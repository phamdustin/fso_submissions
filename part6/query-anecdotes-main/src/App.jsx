import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'

import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, upvote } from './requests'
import { useContext } from 'react'

const App = () => {

  const queryClient = useQueryClient()
  const [message, notificationDispatch] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({ 
    mutationFn: upvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = async (anecdote) => {
    newAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    notificationDispatch({payload:`You voted for: ${anecdote.content}`})
    setTimeout(() => {
      notificationDispatch({ payload: '' })
    },5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm /> 
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
