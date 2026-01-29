import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('') // State for search

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = () => {
    if (newName.trim() === '') {
      window.alert("Name can't be empty");
      console.log("Name can't be empty");
      return
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`"${newName}" is already added to phonebook`);
      console.log(`"${newName}" is already added to phonebook`);
      return
    }
    const newPerson = { name: newName, number: newNumber, id: Date.now() }
    setPersons(persons.concat(newPerson))
    console.log(`Added: ${newName} with number: ${newNumber}`)
    setNewName('')
    setNewNumber('')
  }

  // Filter persons based on search term (case-insensitive)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>

      <h2>Phonebook</h2>

      <div>
        Search: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      <div>

        <h2>Add a new</h2>

        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button onClick={addPerson}>add</button>
        </div>

      </div>

      <h2>Numbers</h2>

      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
      
    </div>
  )
}

export default App