const CountryInfo =({ country }) =>{
    console.log("country in countryinfo" , Object.keys(country.languages))
  
    for (let [key, value] of Object.entries(country.languages)) {
      console.log("in test", key, value)
    }
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
      </div>
    )
  }
  
  export default CountryInfo