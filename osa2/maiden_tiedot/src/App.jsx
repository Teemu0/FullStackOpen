import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
    if (props.countriesFiltered.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (props.countriesFiltered.length > 1) {
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
        return <CountryInfo country={props.countriesFiltered} />
    }
}

const CountryInfo = (props) => {
    // Getting languages
    const langs = []
    for (const [key, value] of Object.entries(props.country[0].languages)) {
        langs.push(value)
    }
    return (
        <div>
            <h1>{props.country[0].name.common}</h1>
                <li>Capital {props.country[0].capital}</li>
                <li>Area {props.country[0].area}</li>
            <h2>Languages</h2>
                {langs.map(lang => <ul key={lang}>{lang}</ul>)}
            <img src={props.country[0].flags.png} alt="flag"></img>
        </div>
    )

}

const App = () => {
    const [key, setKey] = useState('')
    const [countries, setCountries] = useState([])

    const handleChange = (event) => {
        setKey(event.target.value)
    }

    // Get all countries
    useEffect(() => {
        console.log('effect run, fetching all countries...')
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
            console.log(`response: ${response}`)
            setCountries(response.data)
            })
    }, [])

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
      <Countries countriesFiltered={countriesFiltered} handleButton={handleButton}/>
    </div>
  )
}

export default App