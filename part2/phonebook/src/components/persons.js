import React from "react"
import { nameSearch } from "./filter"
import personsService from "../services/persons"



const Names = ({ name, handleDeleteButton }) => 
<tr>
  <td>{name.name}</td>
  <td>{name.number}</td>
  <td><button onClick={handleDeleteButton}>delete</button></td>
</tr>

const Persons = ({ persons, searchValue, setPersons }) => {
  console.log("persons", persons)
  
  const handleDeleteButtonOf = name =>{
    const id = name.id
    console.log('deleting id ' + id )

    if (window.confirm(`Delete ${name.name} contacts?`)){
      personsService
        .removePerson(id)
        .then(() =>{
          personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        })
    }
  }

    return(
        <div>
        <table>
          <tbody>
            {nameSearch({persons, searchValue}).map((name, id) => 
              <Names key={id} 
                name={name} 
                handleDeleteButton={() => handleDeleteButtonOf(name)} 
              />
            )}
          </tbody>
        </table>
      </div>
    )
}

export default Persons