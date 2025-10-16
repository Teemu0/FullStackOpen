import { useState } from 'react'

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
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = (props) =>
{
  return (
    <p>{props.person.name} {props.person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    // If newName is empty
    if (newName === '') {
      alert(`Please add a name`)
    }
    // If name is already taken
    else if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    // Else add new person
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
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

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
