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

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>

const PrintParts = ({course}) => {
  console.log("Printing the part names and IDs")
  var nameId = course.parts.map(function(courses) {
    return <main>courses.name + courses.id</main>
  }

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


  const Course = ({course}) => {
    console.log("This is the name", course.name)
    return(
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
      </div>
    )
  }

  return <Course course={course} />
}

export default App