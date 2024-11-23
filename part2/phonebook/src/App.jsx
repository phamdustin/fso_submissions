import React, { useState } from 'react'

const PrintAllNames = ({people}) => {
    return (
      <div>{people.map(person => <main>{person.name} {person.number}</main>)}</div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456'}, 
    { id: 2, name: 'Sergio Meyers', number: '39-44-5323523'},
    { id: 3, name: 'Ada Lovelace', number: '12-43-234423'}
  ]) 

  const [filteredList, setFilteredList] = useState([
    { id: 0, name: 'Arto Hellas', number: '040-123456'}, 
    { id: -1, name: 'Sergio Meyers', number: '39-44-5323523'},
    { id: -2, name: 'Ada Lovelace', number: '12-43-234423'}])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: String(persons.length+1),
      name: newName,
      number: newNumber
    }
    var same = persons.find(function(person) {
      return person.name === personObject.name
    })

    if (!same) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log("Added " + personObject.name)
    } else {
      alert(`${personObject.name} is already in the phonebook.`)
    }
    setFilteredList(persons)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    if (event.target.value!="") {
      console.log("There is a filter applied")
      const filterBySearch = persons.filter((person) => {
        if (person.name.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {return person}
      }) 
      setFilteredList(filterBySearch) 
    } else {
      setFilteredList(persons)
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input value={newFilter} onChange={handleFilterChange} />
        </div>


      <h2>Add a new number</h2>
      <form onSubmit={addPerson}> 
        <div>
          name: <input value={newName} onChange={handleNameChange}/> 
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>People</h2>

      <PrintAllNames people={filteredList}/> 
    </div>
  )
}

export default App
