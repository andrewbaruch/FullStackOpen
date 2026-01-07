import { useState, useEffect } from 'react'
import axios from 'axios'

const Contacts = ({contacts}) => {
  return (
    <div>
      <h2> Numbers </h2>
      {contacts.map((persons) => 
        <p key = {persons.name}>{persons.name} {persons.number}</p>
      )}
    </div>
  )
}

const AddNew = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const findFunction = (person) => {
    // console.log(person.name)
    // console.log(newName)
    // console.log(person.name === newName)
    return person.name == newName
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (persons.find((e) => findFunction(e)) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newperson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newperson))
      setNewName('')
      setNewNumber('')
    }
  }

  return(
    <div>
      <h2> Add New Contacts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
         <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}

const Filter = ({filter, setFilter}) => {
  return (
    <div>
        filter shown with <input value={filter} onChange={e => setFilter(e.target.value)} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const filterFunction = (entry) => {
    // console.log(entry.name.toLowerCase(), filter.toLowerCase(), entry.name.toLowerCase().includes(filter.toLowerCase()))
    return(entry.name.toLowerCase().includes(filter.toLowerCase()))
  }

  useEffect(() => {
    console.log('Effect Called')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('data pulled')
        setPersons(response.data)
      })
  }, [])

  let filteredMap = persons.filter(entry => filterFunction(entry))
  // console.log(filteredMap)


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <AddNew persons={persons} setPersons={setPersons}/>
      <Contacts contacts={filteredMap} />
    </div>
  )
}

export default App