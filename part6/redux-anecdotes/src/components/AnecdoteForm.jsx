import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log("Adding anecdote")
    dispatch(addAnecdote(content))
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