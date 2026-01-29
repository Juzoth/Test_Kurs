import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = () => {
    if (newName.trim() === '') {
      console.log("Name can't be empty")
      return
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`"${newName}" is already added to phonebook`);
      console.log(`"${newName}" is already added to phonebook`);
      return
    }
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    console.log(`Added: ${newName}`)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button onClick={addPerson}>add</button>
        </div>
      </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App