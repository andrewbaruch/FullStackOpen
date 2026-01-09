import Utils from "../common/Utils";
import personService from "../services/persons";

const Person = ({person, removeFunction}) => {
  return (
    <div>
      {" "}
      {person.name} {person.number}{" "}
      <button onClick={() => removeFunction(person)}>delete</button>
    </div>
  );
};

const Contacts = ({contacts, refreshList, setNotif}) => {
  const removeFunction = (person) => {
    let confirmation = confirm("Are you sure you want to delete this contact?");
    if (confirmation) {
      personService
        .remove(person.id)
        .then((response) => {
          console.log(response);
          Utils.set5SecondNotif(`Deleted '${person.name}'`, setNotif);
          refreshList();
        })
        .catch((error) => {
          console.log("Contactserror", error);
          Utils.handleErrors(error, setNotif);
          refreshList();
        });
    }
  };

  return (
    <div>
      <h2> Numbers </h2>
      {contacts.map((persons) => (
        <Person
          key={persons.name}
          person={persons}
          removeFunction={removeFunction}
        />
      ))}
    </div>
  );
};

export default Contacts;
