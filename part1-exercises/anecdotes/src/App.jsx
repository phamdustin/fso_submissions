import { useState } from 'react'
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text}</button>
)

function getRandom() {
  return Math.floor(Math.random()*8)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState( new Array(8).fill(0))
  const [mostVotes, setMost] = useState(new Array(2).fill(0))

  const nextAnecdote = () =>{
    setSelected(getRandom())
  }

  const upVote = (number) => {
    console.log("Upvote")
    const copy = [...points]
    copy[selected] += 1
    if (copy[selected] > mostVotes[0]) {
      mostVotes[0] = copy[selected]
      mostVotes[1] = selected
    }
    setPoints(copy)
  }
  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <main>{anecdotes[selected]}</main>
      <main>{`Has ${points[selected]} votes`}</main>
      <Button handleClick={upVote} text="vote"/>
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <main>{anecdotes[mostVotes[1]]}</main>
      <main>{`Has ${mostVotes[0]} votes`}</main>
    </div>
  )
}

export default App