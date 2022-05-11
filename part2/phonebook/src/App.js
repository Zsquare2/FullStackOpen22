import { useState } from 'react'

const Names = ({ name }) => <tr><td>{name.name}</td></tr>


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
    const namesArray = persons.map(names => names.name)

    console.log("button clicked", event.target)
    console.log("can i add name :", newName )
    // nameExists()
      if (namesArray.includes(newName)){
        console.log("name exists")
        window.alert(`${newName} is already added to phonebook`);

      }else{
      const newObject = {
        name: newName,
        // id: persons.length +1
      }

      setPersons(persons.concat(newObject))
      setNewName("")
    }}


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