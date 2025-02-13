import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const phrase = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(upvote(id))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote => (
    //console.log(anecdote),
    anecdote.content.toLowerCase().includes(phrase.toString().toLowerCase())))

  const sortedData = [...filteredAnecdotes].sort((a,b) => b.votes - a.votes); // sorts the array by number of votes before rendering
  
  //console.log(filteredAnecdotes)
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