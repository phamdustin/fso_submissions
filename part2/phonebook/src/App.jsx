import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import PrintAllNames from './components/PrintAllNames.jsx'
import AddForm from './components/AddForm.jsx'
import SearchFilter from './components/SearchFilter.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log("effect starting")
    personService
      .getAll()
      .then(response => {
        console.log('Promise fulfilled to get data from persons server')
        setPersons(response)
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length+1)
    }
    var same = persons.find(function(person) {
      return person.name === personObject.name
    })

    if (!same) {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          console.log("Added " + response.name) 
        })


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
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new number</h2>
      <AddForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleAddPerson={handleAddPerson} handleNumberChange={handleNumberChange}/>
      <h2>People</h2> 
      <PrintAllNames filter={newFilter} people={persons}/> 
    </div>
  )
}

export default App
