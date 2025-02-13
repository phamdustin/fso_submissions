import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { settingNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const phrase = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const vote = async (id) => {
    console.log('vote', id)
    dispatch(upvote(id))
    dispatch(settingNotification('Upvoted anecdote'))
    await delay(5000)
    dispatch(clearNotification())
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