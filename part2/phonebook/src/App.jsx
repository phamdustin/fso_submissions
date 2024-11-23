import React, { useState } from 'react'
import PrintAllNames from './components/PrintAllNames.jsx'
import AddForm from './components/AddForm.jsx'
import SearchFilter from './components/SearchFilter.jsx'

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

  const handleAddPerson = (event) => {
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
      <SearchFilter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new number</h2>
       
      <AddForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleAddPerson={handleAddPerson} handleNumberChange={handleNumberChange}/>
      <h2>People</h2> 
      <PrintAllNames people={filteredList}/> 
    </div>
  )
}

export default App
