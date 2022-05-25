import { useState, useEffect } from 'react'
import { Filter} from './components/filter'
import  Countries from './components/countries'
import React from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} setSearchValue={setSearchValue} country={countries}/>
      <Countries country={countries} searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
  )}

export default App