import React from "react"
import { nameSearch } from "./filter"


const Names = ({ name }) => <tr><td>{name.name}</td><td>{name.number}</td></tr>

const Persons = ({ persons, searchValue }) => {
    return(
        <div>
        <table>
          <tbody>
            {nameSearch({persons, searchValue}).map((name, index) => 
              <Names key={index} name={name} />
            )}
          </tbody>
        </table>
      </div>
    )
}

export default Persons