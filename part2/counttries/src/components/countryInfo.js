import { useEffect } from "react"
import axios from "axios"
import WeatherInfo from "./weatherInfo"

const CountryInfo =({ country , setWeatherInfo, weatherInfo}) =>{
    
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const capital =country.capital
      if (capital){
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setWeatherInfo(response.data)
      })
    }}, [country, setWeatherInfo])
    
    return(
      <div>
        <h2>{country.name.common}</h2>
        <table>
          <tbody>
            <tr><td>capital {country.capital}</td></tr>
            <tr><td>area {country.area}</td></tr>
          </tbody>  
        </table>
  
        <h3>languages:</h3>
          <ul>
            {Object.entries(country.languages)
              .map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        <p>
          <img src={country.flags.png} alt="flag"/>
        </p>
      {weatherInfo && <WeatherInfo country={country} weatherInfo={weatherInfo} />}
      </div>
    )
  }
  
  export default CountryInfo