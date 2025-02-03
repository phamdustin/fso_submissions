import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(upvote(id))
  }

  const sortedData = [...anecdotes].sort((a,b) => b.votes - a.votes); // sorts the array by number of votes before rendering

  return (
    <div>
      {sortedData.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList