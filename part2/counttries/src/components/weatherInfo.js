
const WeatherInfo = ({weatherInfo, country }) => {

    const getIcon = weatherInfo.weather.map((info) => info.icon)
    const weatherIconURL = `http://openweathermap.org/img/wn/${getIcon}@2x.png`


return(
<div>
<h3>Weather in {country.capital}</h3>
<p>temprature {weatherInfo.main.temp} Celcius</p>
<img src={weatherIconURL} alt="weather icon"/>
<p>wind {weatherInfo.wind.speed} m/s </p>
</div>  
)
}

export default WeatherInfo