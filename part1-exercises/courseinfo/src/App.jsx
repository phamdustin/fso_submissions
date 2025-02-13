// Up to exercise 1.5
const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part + " " + props.num}</p>
    </div>
  )
}
const Header = (props) => {
  return (
    <div>
      <p>{props.course} </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} num={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} num={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} num={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises
      + props.parts[2].exercises}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
