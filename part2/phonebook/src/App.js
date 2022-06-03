import { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import { Filter} from './components/filter'
import Persons from './components/persons'
import React from "react"
import personsService from "./services/persons"
import Notification from "./components/Notification"



const App = () => {
  const [persons, setPersons] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={error}/>
      <Filter value={searchValue} setSearchValue={setSearchValue} persons={persons}/>

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} />

      <h2>Numbers</h2>
      <Persons persons={persons} 
        searchValue={searchValue} 
        setPersons={setPersons} 
        setNotificationMessage={setNotificationMessage}
        setError={setError}
        />
    </div>
  )}

export default App