import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { settingNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  
  const dispatch = useDispatch()
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log("Adding anecdote")
    dispatch(addAnecdote(content))
    dispatch(settingNotification('Added new anecdote'))
    await delay(5000)
    dispatch(clearNotification())
  } 

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={newAnecdote}>
          <input name="anecdote"/>
          <button type="submit">create</button>
        </form>
    </div>
  )
}
export default AnecdoteForm