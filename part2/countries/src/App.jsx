import { useState, useEffect } from 'react'
import './App.css'
import PrintCountries from './components/printCountries'
import countriesService from './services/countries'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredList, setFilteredList] = useState(null)
  const [findCountries, setFindCountries] = useState('')

  useEffect(() => {
    countriesService
      .getList()
      .then((response) => {
        console.log('Promise fulfilled to get data from countries server')
        setAllCountries(response.map((countries => countries)))
      }
      )
  }, [])

  useEffect(() => {
    setFilteredList(allCountries.filter((country) => {if (country.name.common.toString().toLowerCase()
      .includes(findCountries.toLowerCase())) {return country} }))
  },[findCountries])

  const countriesHandler = (event) => {
    console.log(event.target.value)
    if (event==="") {
      setFindCountries(null)
    } else{
      setFindCountries(event.target.value)
    }
  }
  return (
    <div>
      <form>
        <div>
          find countries: <input value={findCountries} onChange={countriesHandler}/>
        </div>
      </form>
      <PrintCountries countriesList={filteredList} filter={findCountries}/>
    </div>
  )
}

export default App
