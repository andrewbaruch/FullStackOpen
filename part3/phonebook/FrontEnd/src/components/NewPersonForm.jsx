import { useState } from 'react'
import personService from '../services/persons'

const AddNew = ({persons, setPersons, setNotif}) => {
  // console.log("adding new")
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
      const confirmation = confirm(`${newName} is already added to phonebook. Replace number instead?`)
      if(confirmation) {
        const edited = {
          name: newName,
          number: newNumber
        }
        personService.update(persons.find((e) => findFunction(e)).id, edited)
          .then(response => {
            setPersons(persons.map(person => person.name === newName ? response : person))
            setNotif(`Edited '${edited.name}'`)
            setTimeout(() => {setNotif(null)}, 5000)
          })
          .catch(error => {
            setNotif(`Information of '${edited.name}' has already been removed from server`)
            setTimeout(() => {setNotif(null)}, 5000)
            setPersons(persons.filter(person => person.name !== newName))
          })
        // Put here so if the user cancels, the fields are not cleared
        setNewName('')
        setNewNumber('')
      }
    } else {
        const newperson = {
            name: newName,
            number: newNumber
        }
        personService
            .create(newperson)
            .then(response => {
            setPersons(persons.concat(response))
            })
        setNotif(`Added '${newperson.name}'`)
        setTimeout(() => {setNotif(null)}, 5000)
        setNewName('')
        setNewNumber('')
        // console.log("added new", newperson)
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

export default AddNew