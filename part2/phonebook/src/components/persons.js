import React from "react"
import { nameSearch } from "./filter"
import personsService from "../services/persons"



const Names = ({ name, handleDeleteButton }) => 
<tr>
  <td>{name.name}</td>
  <td>{name.number}</td>
  <td><button onClick={handleDeleteButton}>delete</button></td>
</tr>

const Persons = ({ persons, searchValue, setPersons, setNotificationMessage, setError }) => {  
  const handleDeleteButtonOf = name =>{
    const id = name.id

    if (window.confirm(`Delete ${name.name} contacts?`)){
      personsService
        .removePerson(id)
        .then(() =>{
          setNotificationMessage(`'${name.name}' was sucessfully removed`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setError(
            `Note '${name.name}' was already removed from server`
          )
          setTimeout(() => {
            setError(null)
          }, 2000)
        })
        .then(refres =>{  
          personsService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })})
    }

    // personsService
    // .getAll()
    // .then(initialPersons => {
    //   console.log("now!!!!!!!!!!!!!")
    //   setPersons(initialPersons)
    // })
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