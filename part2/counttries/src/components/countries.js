import React from "react"
import { nameSearch } from "./filter"
import CountryInfo from "./countryInfo"
import DisplayNames from "./displayNames"


const Countries = ({ country, searchValue }) => {
  console.log("names search" ,nameSearch({country, searchValue}).length)
  
  const filtredCountries = nameSearch({country, searchValue})
  const searchLength = filtredCountries.length

  console.log("search value",filtredCountries[0])

  if (searchLength > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  }

  if (searchLength === 1)
    return(
      <div>One left
        <div>
          {filtredCountries.map((country)=>(
            <CountryInfo country={country} 
            key={Object.keys(country.languages)}/>
          ))}
         </div>
      </div>
    )
  
  return(
    <div>
      <table>
        <tbody>
          {filtredCountries.map((name, index) => 
            <DisplayNames key={index} name={name} />
          )}
        </tbody>
      </table>
    </div>
    )
}

export default Countries