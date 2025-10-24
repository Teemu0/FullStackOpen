import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
    if (props.countriesFiltered.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (props.countriesFiltered.length > 1) { // List of country names with buttons next to them
        return (
            <div>
                {props.countriesFiltered.map(element => {
                    return (
                        <li key={element.cca2}>
                            {element.name.common}
                            <button onClick={() => props.handleButton(element.name.common)}>Show</button>
                        </li>
                    )}
                    )
                }
                
            </div>
        )
    }
    else if (props.countriesFiltered.length === 1) {
        return <CountryInfo country={props.countriesFiltered} api_key={props.api_key} weather={props.weather} />
    }
}

const CountryInfo = (props) => {
    // Getting languages
    const langs = []
    for (const [key, value] of Object.entries(props.country[0].languages)) {
        langs.push(value)
    }
    const img_src = `https://openweathermap.org/img/wn/${props.weather[1]}@2x.png`

    return (
        <div>
            <h1>{props.country[0].name.common}</h1>
                <li>Capital {props.country[0].capital}</li>
                <li>Area {props.country[0].area}</li>
            <h2>Languages</h2>
                {langs.map(lang => <ul key={lang}>{lang}</ul>)}
            <img src={props.country[0].flags.png} alt="flag"></img>
            <h2>Weather in {props.country[0].capital}</h2>
                <li>Temperature {props.weather[0]} Celcius</li>
                <img src={img_src} alt="weather"></img>
                <li>Wind {props.weather[2]} m/s</li>
        </div>
    )
}

const App = () => {
    const [key, setKey] = useState('')
    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState([])
    const api_key = import.meta.env.VITE_SOME_KEY

    const handleChange = (event) => {
        setKey(event.target.value)
    }

    useEffect(() => {
        console.log('effect run')
        // Get all countries
        if (countries.length === 0) {
            console.log('fetching all countries...')
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                .then(response => {
                console.log(`response: ${response}`)
                setCountries(response.data)
                })
        }
        // Get weather information
        if (countriesFiltered.length === 1) {
            console.log('fetching weather information...')
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countriesFiltered[0].latlng[0]}&lon=${countriesFiltered[0].latlng[1]}&appid=${api_key}`)
                .then(response => {
                const temp = Math.round( 100 * (response.data.main.temp - 273.15)) / 100
                const icon = response.data.weather[0].icon
                const wind = Math.round( 100 * response.data.wind.speed) / 100
                setWeather([temp, icon, wind])
                console.log(`weather: ${weather}`)
                })
        }  
    }, [key])

    // Called when clicked on a button. Changes key to associated country name
    const handleButton = (countryName) => {
        setKey(countryName)
    }

    // Filter countries by 'key'
    const countriesFiltered = countries.filter(element => {
            return element.name.common.toLowerCase().includes(key.toLowerCase())         
        })

    return (
    <div>
      <form >
        find countries: <input value={key} onChange={handleChange} />
      </form>
      <Countries countriesFiltered={countriesFiltered} handleButton={handleButton} api_key={api_key}
        weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default App