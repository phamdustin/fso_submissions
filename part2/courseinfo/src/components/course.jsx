const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => {
  console.log("Calculating total")

  const total = course.parts.reduce(function(sum,part) {
    var localTotal = sum+part.exercises
    console.log(`Total is ${localTotal}`)
    return localTotal
  },0)
  return(<b>Number of exercises {total}</b>) 

}

const Content = ({ parts }) => {
  console.log("Printing 1 course's part names and IDs")
  return(
    <p>{parts.map(part => <main>{part.name}  {part.exercises}</main>)}</p>
  )
}


const Course = ({course}) => {
    console.log("Creating object Course")
    return(
        <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total course={course}/>
        </div>


    )
}

export default Course