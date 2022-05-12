import React from "react"
import {useState} from "react"

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
            window.alert(`${newName} is already added to phonebook`);
          }
          else{
            const newObject = {
              name: newName,
              number: newNumber,
              id: persons.length +1
            }
            setPersons(persons.concat(newObject))
            setNewName("")
            setNewNumber("")
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