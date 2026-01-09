import personService from '../services/persons'

const Person = ({person, removeFunction}) => {
  return (
    <div> {person.name} {person.number} <button onClick={() => removeFunction(person)}>delete</button></div>
  )
}

const Contacts = ({contacts, setPersons, setNotif}) => {

  const removeFunction = (person) => {
    let confirmation = confirm("Are you sure you want to delete this contact?")
    if(confirmation) {
      personService.remove(person.id)
      .then(response => {
        console.log(response)
        setPersons(contacts.filter(e => e.id !== person.id))
        setNotif(`Deleted '${person.name}'`)
        setTimeout(() => {setNotif(null)}, 5000)
      })
      .catch(error => {
        console.log(error)
        setNotif(`Information of '${person.name}' has already been removed from server`)
        setTimeout(() => {setNotif(null)}, 5000)
        setPersons(contacts.filter(e => e.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2> Numbers </h2>
      {contacts.map((persons) => 
        <Person key = {persons.name} person={persons} removeFunction={removeFunction}/>
      )}
    </div>
  )
}

export default Contacts