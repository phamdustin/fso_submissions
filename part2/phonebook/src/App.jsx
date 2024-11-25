import React, { useState, useEffect } from 'react'
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

  async function handleAddPerson(event) {
    event.preventDefault()


    var same = persons.find(function(person) {
      return person.name === newName
    })

    const personObject = {
      name: newName,
      number: newNumber,
      id: same? same.id:String(persons.length+1)
    }


    if (!same) {
      console.log("New person being added to phonebook")
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          console.log("Added " + response.name) 
        })


    } else {
      window.confirm(`${personObject.name} is already in the phonebook, replace the old number with a new one?`)
      await personService
      .update(personObject.id,personObject)
      .then(response => {
        console.log(`Updated ${response.name} to ${response.number}` ) 
      })

      await personService
      .getAll()
      .then(response => {
        console.log('Promise fulfilled to get data from persons server')
        setPersons(response)
        setNewName('')
        setNewNumber('')
        console.log("Added " + response.name) 
      })
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

  async function handleRemovePerson(event){
    console.log(`Removing ${event.target.value}`)
    if (window.confirm("Are you sure you want to delete?")) {
      await personService
        .remove(event.target.value)
        .then(response =>{
          console.log("Removal complete")
        })
      
      personService
        .getAll()
        .then(response => {
          console.log('Promise fulfilled to get data from persons server')
          setPersons(response)
          console.log('Updated state of persons')
        })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new number</h2>
      <AddForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleAddPerson={handleAddPerson} handleNumberChange={handleNumberChange}/>
      <h2>People</h2> 
      <PrintAllNames filter={newFilter} people={persons} handleRemovePerson={handleRemovePerson}/> 
    </div>
  )
}

export default App
