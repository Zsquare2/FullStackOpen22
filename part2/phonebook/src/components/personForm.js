import React from "react"
import {useState} from "react"
import personsService from "../services/persons"

const PersonForm =({persons, setPersons }) =>{
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => 
        setNewName(event.target.value)
    
      const handleNumberChange = (event) =>
        setNewNumber(event.target.value)

    const addName = (event) =>{
        event.preventDefault()
    
          if (persons.map(names => names.name).includes(newName)){
            window.alert(`${newName} is already added to phonebook`)

            if (window.confirm("wanna change that ?")){
              const person = persons.find(p => p.name === newName)
              const changedPerson = { ...person, number: newNumber}
              const personsId = person.id

              // personsService
              //   .update( personsId, changedPerson)
              //   .then(() => {
              //     personsService
              //     .getAll()
              //     .then(initialPersons => {
              //       setPersons(initialPersons)
              //   })})

              personsService
                .update( personsId, changedPerson)
                .then(returnedPerson => {
                  console.log("returned person data", returnedPerson.data)
                  setPersons(persons.map(person => 
                    person.id !== personsId ? person : returnedPerson))
                })
            }
          }
          
          else{
            const length = persons.length
            console.log("lenght", persons[length - 1].id)
            const newObject = {
              name: newName,
              number: newNumber,
              // id: persons.length +1
              id: persons[length - 1].id +1
            }
            setPersons(persons.concat(newObject))
            setNewName("")
            setNewNumber("")

            personsService
              .create(newObject)
              .then(returnPerson =>{
                setPersons(persons.concat(returnPerson))
              } )
        }}
    
    return(
        <div>
        <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
}

export default PersonForm