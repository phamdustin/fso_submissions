import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  console.log("Printing the part names and IDs")
  return(
    <main>{parts.map(part => <main>{part.name}  {part.exercises}</main>)}</main>
  )
}



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  const total = course.parts.reduce(function(sum,part) {
    var localTotal = sum+part.exercises
    console.log(`Total is ${localTotal}`)
    return localTotal
  }, 0)

  const Course = ({course}) => {
    console.log("Creating object Course")
    return(
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total sum={total}/>
      </div>

    )
  }

  return <Course course={course} />
}

export default App