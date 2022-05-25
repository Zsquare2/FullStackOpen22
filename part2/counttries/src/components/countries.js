import React from "react"
import { nameSearch } from "./filter"
import CountryInfo from "./countryInfo"
import DisplayNames from "./displayNames"
import { useState} from "react"


const Countries = ({ country, searchValue, setSearchValue }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)
  const filtredCountries = nameSearch({country, searchValue})
  const searchLength = filtredCountries.length

  const handleClick = selectedCountryName => setSearchValue(selectedCountryName)
  
  if (searchLength > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  }

  if (searchLength === 1){
    return(
      <div>One left
        <div>
          {filtredCountries.map((country)=>(
            <CountryInfo country={country} 
            key={Object.keys(country.name)} setWeatherInfo={setWeatherInfo} weatherInfo={weatherInfo} />
          ))}
         </div>
      </div>
    )}
  
  return(
    <div>
      <table>
        <tbody>
          {filtredCountries.map((name, index) => 
            <DisplayNames key={index} name={name} handleClick={handleClick}   />
          )}
        </tbody>
      </table>
    </div>
    )
}

export default Countries