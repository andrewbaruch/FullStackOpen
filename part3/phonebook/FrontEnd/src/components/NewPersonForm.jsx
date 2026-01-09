import {useState} from "react";
import personService from "../services/persons";
import Utils from "../common/Utils";

const AddNew = ({persons, refreshList, setNotif}) => {
  // console.log("adding new")
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const findFunction = (person) => {
    return person.name == newName;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const personInData = persons.find((e) => findFunction(e));

    if (personInData !== undefined) {
      const confirmation = confirm(
        `${newName} is already added to phonebook. Replace number instead?`
      );
      if (confirmation) {
        const edited = {
          name: personInData.name,
          number: newNumber,
          id: personInData.id
        };
        personService
          .update(personInData.id, edited)
          .then((response) => {
            Utils.set5SecondNotif(`Edited ${edited.name}`, setNotif);
            setNewName("");
            setNewNumber("");
            refreshList();
          })
          .catch((e) => {
            console.log("ERROR IN EDITING", e);
            Utils.handleErrors(e, setNotif);
            refreshList();
          });
        // Put here so if the user cancels, the fields are not cleared
      }
    } else {
      const newperson = {name: newName, number: newNumber};
      personService
        .create(newperson)
        .then((response) => {
          console.log("RESPONSE", response);
          Utils.set5SecondNotif(`Added '${newperson.name}'`, setNotif);
          setNewName("");
          setNewNumber("");
          refreshList();
        })
        .catch((e) => {
          console.log("Catching error in newperson From", e);
          Utils.handleErrors(e, setNotif);
          refreshList();
        });
    }
  };

  return (
    <div>
      <h2> Add New Contacts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
