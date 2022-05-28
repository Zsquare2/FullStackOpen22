import { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import { Filter} from './components/filter'
import Persons from './components/persons'
import React from "react"
import axios from "axios"
import personsService from "./services/persons"



const App = () => {
  const [persons, setPersons] = useState([])
  const [searchValue, setSearchValue] = useState('')

  console.log('restcountries')
  console.log(axios.get('https://restcountries.com/v3.1/all'))

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} setSearchValue={setSearchValue} persons={persons}/>

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchValue={searchValue} setPersons={setPersons}/>
    </div>
  )}

export default App