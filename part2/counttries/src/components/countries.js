import React from "react"
import { nameSearch } from "./filter"
import CountryInfo from "./countryInfo"
import DisplayNames from "./displayNames"
import { useState } from "react"


const Countries = ({ country, searchValue, setSearchValue }) => {
  const [selected, setSelected] = useState(0)
  console.log("names search" ,nameSearch({country, searchValue}).length)
  const testas="finland"
  const filtredCountries = nameSearch({country, searchValue})
  console.log("TESTAS", searchValue)
  const searchLength = filtredCountries.length

  console.log("search value",filtredCountries[0])

  const handleClick = countryName => { 
    setSearchValue(countryName)
  }
  if (selected !== 0){
    const selectedCountry = nameSearch({country, selected})

    return(
      <div>selected
        <div>
          {selectedCountry.map((country)=>(
            <CountryInfo country={country} 
            key={Object.keys(country.languages)}/>
          ))}
         </div>
      </div>
    )
  }

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
            <DisplayNames key={index} name={name} handleClick={handleClick}  />
          )}
        </tbody>
      </table>
    </div>
    )
}

export default Countries