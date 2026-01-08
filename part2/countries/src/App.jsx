import { useState, useEffect } from 'react'
import Searchbox from './components/Searchbox'
import Countries from './components/Countries' 
import dbService from './services/db'

function App() {
  const [search, setSearch] = useState('')

  const [countryList, setCountryList] = useState([])
  const [filteredList, setFilteredList] = useState([])

  const countryFilter = (entry) => {
    return entry.name.common.toLowerCase().includes(search.toLowerCase())
  }

  useEffect(() => {
    dbService
      .getAll()
      .then(countries => {
        setCountryList(countries)
        const initialFilteredList = countries.filter(countryFilter)
        setFilteredList(initialFilteredList)
        // console.log("filteredListAfter", initialFilteredList)
      })
  }, [])
  
  useEffect(() => {
    console.log("Search", search)
    console.log("FilteredListUpdated")
    setFilteredList(countryList.filter(countryFilter))
  }, [search])
  
  return (
    <>
      <Searchbox search={search} setSearch={setSearch} />
      <Countries countryList={filteredList} setSearch={setSearch} />
    </>
  )
}

export default App
