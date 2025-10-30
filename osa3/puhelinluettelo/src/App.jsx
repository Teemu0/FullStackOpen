import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: 
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number:
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map(person => 
        <Person key={person.name} person={person} removePerson={() => props.removePerson(person.id)} />
      )}
    </div>
  )
}

const Person = (props) =>
{
  return (
    <li>
      {props.person.name} {props.person.number}
      <button onClick={props.removePerson}>delete</button>
    </li>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}
const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    // If newName is empty
    if (newName === '') {
      alert(`Please add a name`)
    }
    // If name is already taken
    else if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, do you want to replace the old number with a new one?`)) {
        // need newObject and id
        const personObject = {
          name: newName,
          number: newNumber
        }
        const id = getId(newName)
        personService
          .update(id, personObject) // updating to server
          .then((response) => {
            setNotificationMessage(
              `Updated number of '${newName}'`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== id ? person : response.data)) // updating locally
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(`error: ${error}`)
            setErrorMessage(
              `Person '${newName}' has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id)) // synchronizing local list with server
          })
      }
    }
    // Else add new person
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject) // adding to server
        .then(response => {
          setNotificationMessage(
              `Added '${newName}'`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          setPersons(persons.concat(response.data)) // adding locally
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('addPerson catch error')
          console.log(error.response.data)
          setErrorMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = id => {
    if (confirm(`Do you want to delete user ${getName(id)}?`)) {
      personService
      .remove(id) // removing from the server
      .then(() => {
        console.log(`Deleted person with id ${id}`)
        setNotificationMessage(
              `Deleted '${persons.find(person => person.id === id).name}'`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
        setPersons(persons.filter(person => person.id !== id)) // removing locally
      })
    }
  }

  const getName = id => {
    // finding person's name for confirm prompt
    return persons.find(person => person.id === id).name
  }

  const getId = name => {
    return persons.find(person => person.name === name).id
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  // persons list filtered by newFilter
  const personsToShow = (newFilter === '')
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new name</h2>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App
