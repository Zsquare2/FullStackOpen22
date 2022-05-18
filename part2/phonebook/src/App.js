import { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import { Filter} from './components/filter'
import Persons from './components/persons'
import React from "react"
import axios from "axios"



const App = () => {
  const [persons, setPersons] = useState([

    ])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("promise fulfilled")
        setPersons(response.data)
      })
      }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} setSearchValue={setSearchValue} persons={persons}/>

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchValue={searchValue}/>
    </div>
  )}

export default App