import axios from 'axios'

/* const removeName = ({person}) => {
  console.log(`Removing ${person.id}`)
  axios
    .delete(`http://localhost:3001/persons/${person.id}`)
} */
const PrintAllNames = ({filter, people, handleRemovePerson}) => {

 
  if (filter!="") {
    console.log("Filtered output")
    const filterBySearch = people.filter((person) => {
      
      if (person.name.toString().toLowerCase().includes(filter.toLowerCase())) {return person} 
    }) 
    return (
      <div>{filterBySearch.map(person => <main> {person.name} {person.number} 
        <button value = {person.id} onClick={(e) => {handleRemovePerson(e,"value")}}>Delete </button></main>)}</div>
    )
  }

  else {
    console.log("NON-Filtered output")
    return (
      <div>{people.map(person => <main> {person.name} {person.number} 
        <button value = {person.id} onClick={(e) => {handleRemovePerson(e,"value")}}>Delete </button></main>)}</div>
    )
  }
  

}
export default PrintAllNames