import { useState } from 'react'

const PrintAllNames = ({people}) => {
  return (
    <div>{people.map(person => <main>{person.name}</main>)}</div>
  )
  
}


const App = () => {
  const [persons, setPersons] = useState(
    [{ id: 1, name: 'Arto Hellas' }, {id: 2,name: 'Sergio Meyers'}]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      id: String(persons.length+1),
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    console.log("Adding", event.target)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}> 
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <PrintAllNames people={persons}/> 
    </div>
  )
}

export default App
