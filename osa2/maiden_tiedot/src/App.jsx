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
                {props.countriesFiltered.map(element => <li key={element.cca2}>{element.name.common}</li>)}
            </div>
        )
    }
    else if (props.countriesFiltered.length === 1) {
        return <CountryInfo country={props.countriesFiltered} />
    }
}

const CountryInfo = (props) => {
    const langs = []
    console.log(props.country[0].languages)
    for (const [key, value] of Object.entries(props.country[0].languages)) {
        langs.push(value)
    }
    return (
        <div>
            <h1>{props.country[0].name.common}</h1>
                <li>Capital {props.country[0].capital}</li>
            <h2>Languages</h2>
                {langs.map(lang => <ul key={lang}>{lang}</ul>)}
        </div>
    )

}

const App = () => {
    const [value, setValue] = useState('')
    const [country, setCountry] = useState(null)
    const [countries, setCountries] = useState([])

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    // Get all countries always when 'value' changes
    useEffect(() => {
        console.log('effect run, value is now', value)

        // skip if value is not defined
        if (value) {
        console.log('fetching all countries...')
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
            console.log(`response: ${response}`)
            // console.log(`response.data: ${response.data}`)
            console.log(`response.data[0]: ${response.data[0]}`)
            console.log(`response.data[0].name.common: ${response.data[0].name.common}`)
            setCountries(response.data)
            })
        }
    }, [value])

    const countriesFiltered = countries.filter(element => {
            return element.name.common.toLowerCase().includes(value.toLowerCase())         
        })

    console.log(`_ countries: ${countries}`)
    console.log(`_ countriesFiltered: ${countriesFiltered}`)

    return (
    <div>
      <form >
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <Countries countriesFiltered={countriesFiltered} />
      <pre>
        {}
      </pre>
    </div>
  )
}

export default App