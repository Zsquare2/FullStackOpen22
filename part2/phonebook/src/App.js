import { useState } from 'react'

const Names = ({ name }) => <tr><td>{name.name}</td><td>{name.number}</td></tr>



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const namesArray = persons.map(names => names.name)


  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleSearchValueChange = (event) =>{
    setSearchValue(event.target.value)
  }

  const nameSearch = 
  (persons.filter((search) => (search.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)))

  const addName = (event) =>{
    event.preventDefault()

    console.log("button clicked", event.target)
    console.log("can i add name :", newName )
    // nameExists()
      if (namesArray.includes(newName)){
        console.log("name already exists")
        window.alert(`${newName} is already added to phonebook`);

      }else{
        const newObject = {
          name: newName,
          number: newNumber,
          id: persons.length +1
        }
        setPersons(persons.concat(newObject))
        setNewName("")
        setNewNumber("")
    }}

  return (
    <div>
      <h2>Search</h2>
      <div>
      filter shown with <input  
        value={searchValue}
        onChange={handleSearchValueChange}
        />
      </div>
      <div>debug search value: {searchValue}</div>


      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      <div>
        <table>
          <tbody>
            {nameSearch.map((name, index) => 
              <Names key={index} name={name} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}

export default App