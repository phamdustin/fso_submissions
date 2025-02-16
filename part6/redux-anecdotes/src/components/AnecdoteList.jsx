import { useSelector, useDispatch } from 'react-redux'
import { voteup } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const phrase = useSelector(state => state.filter)
  const dispatch = useDispatch()
  //const delay = ms => new Promise(res => setTimeout(res, ms));

  const vote = async (id) => {
    console.log('vote', id)
    dispatch(voteup(id))
    dispatch(setNotification(`upvoted`,10))
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