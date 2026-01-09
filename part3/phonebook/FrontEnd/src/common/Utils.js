const handleErrors = (e, setNotif) => {
  console.log("Handling error", e);
  if (e.response && e.response.data && e.response.data.error) {
    set5SecondNotif(`Encountered Error: ${e.response.data.error}`, setNotif);
  } else if (e.response && e.response.statusText) {
    set5SecondNotif(e.response.statusText, setNotif);
  } else {
    set5SecondNotif("An unknown error occurred", setNotif);
  }
};

const set5SecondNotif = (message, setNotif) => {
  console.log("Set 5SecondNotif", message);
  setNotif(message);
  setTimeout(() => {
    setNotif(null);
  }, 5000);
};

export default {handleErrors, set5SecondNotif};
