import { useState } from 'react'

const Names = ({ name }) =>{
  return(
    <tr><td>{name.name}</td></tr>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      // id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    console.log("button clicked", event.target)
    const newObject = {
      name: newName,
      // id: persons.length +1
    }
    setPersons(persons.concat(newObject))
    setNewName("")
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
<div>
<table>
        <tbody>
          {persons.map((name, index) => 
            <Names key={index} name={name} />
          )}
        </tbody>
      </table>

</div>
      </div>
  )}

export default App