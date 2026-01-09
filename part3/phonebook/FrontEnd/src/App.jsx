import {useState, useEffect} from "react";
import personService from "./services/persons";
import Contacts from "./components/Contacts";
import AddNew from "./components/NewPersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notif, setNotif] = useState(null);
  const filterFunction = (entry) => {
    // console.log(entry.name.toLowerCase(), filter.toLowerCase(), entry.name.toLowerCase().includes(filter.toLowerCase()))
    return entry.name.toLowerCase().includes(filter.toLowerCase());
  };

  /* Changed to most setPersons to
   * refresh list since we have a db as a source of truth
   * handles sync issues when 2 or more frontends are open
   */
  const refreshList = () => {
    personService.getAll().then((response) => {
      // console.log('data pulled')
      setPersons(response);
    });
  };

  useEffect(() => {
    // console.log('Effect Called')
    personService.getAll().then((response) => {
      // console.log('data pulled')
      setPersons(response);
    });
  }, []);

  let filteredMap = persons.filter((entry) => filterFunction(entry));

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notif} />
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <AddNew
        persons={persons}
        refreshList={refreshList}
        setNotif={setNotif}
      />
      <Contacts
        contacts={filteredMap}
        refreshList={refreshList}
        setNotif={setNotif}
      />
    </div>
  );
};

export default App;
