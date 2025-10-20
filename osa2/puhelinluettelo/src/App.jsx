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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
            setPersons(persons.map(person => person.id !== id ? person : response.data)) // updating locally
            setNewName('')
            setNewNumber('')
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
          setPersons(persons.concat(response.data)) // adding locally
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = id => {
    if (confirm(`Do you want to delete user ${getName(id)}?`)) {
      personService
      .remove(id) // removing from the server
      .then(() => {
        console.log(`Deleted person with id ${id}`)
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
