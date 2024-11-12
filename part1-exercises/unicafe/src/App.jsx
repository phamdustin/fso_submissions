import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text}</button>
)

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}
const Statistics = (props) => {
  if (props.total.good === 0 && props.total.neutral === 0 && props.total.bad === 0) {
    return (
      <main>No feedback given</main>
    )
  }
  return (
    <div>
      <table>
        <StatisticLine text="good" value={props.total.good}/> 
        <StatisticLine text="neutral" value={props.total.neutral}/>
        <StatisticLine text="bad" value={props.total.bad}/>
        <StatisticLine text="total" value={props.total.good+props.total.neutral+props.total.bad}/>
        <StatisticLine text="average" value={((props.total.good-props.total.bad)/(props.total.good+props.total.neutral+props.total.bad)).toFixed(2)}/>
        <StatisticLine text="positive percentage" value={((props.total.good/(props.total.good+props.total.neutral+props.total.bad))*100).toFixed(1)}/> 
      </table>


    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [total, setTotal] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => {
    const updatedGood = total.good + 1
    console.log('updating good counter to', updatedGood)
    setTotal({ ...total, good: updatedGood})

  }

  const handleNeutralClick = () => {
    const updatedNeutral = total.neutral + 1
    console.log('updating neutral counter to', updatedNeutral)
    setTotal({ ...total, neutral: updatedNeutral})

  }
  const handleBadClick = () => {
    const updatedBad = total.bad + 1
    console.log('updating bad counter to', updatedBad)
    setTotal({ ...total, bad: updatedBad})
  }


  return (
    <main>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text = 'good' />
      <Button handleClick={handleNeutralClick} text = 'neutral'/>
      <Button handleClick={handleBadClick} text = 'bad'/>

      <h1>status</h1>
      <Statistics total={total}/>
    </main>
  )
}

export default App
