import { useState, useEffect } from 'react'
import dbService from '../services/db.js'
import weatherService from '../services/weather.js'

const CountryDetail = ({title, content}) => {
    return (
        <p> <b>{title}: </b> {content}</p>
    )
}

const CountryDetailList = ({title, list}) => {
    // console.log("COUNTRY DETAIL LIST", list)
    // console.log("COUNTRY DETAIL LIST Entries", Object.entries(list))
    return (
        <div>
            <h3> {title}: </h3>
            <ul>
                {Object.entries(list).map(([a, b]) => {return (<li key={a}> {b} </li>)})}
            </ul>
        </div>
    )
}

const WeatherDetail = ({lan, lon, capital}) => {
    const [weatherData, setWeatherData] = useState(null)
    
    useEffect(() => {
        weatherService
            .getWeather({lat: lan, lon: lon})
            .then(data => {
                console.log("WEATHER DATA", data.data)
                setWeatherData(data.data)
            })
    }, [])

    if (weatherData == null) {
        return null
    } else {
        return (
            <>
                <h3> Weather in {capital}</h3>
                <CountryDetail title="Temperature" content={`${weatherData.main.temp} °C`}/>
                <img src={weatherService.getWeatherIconUrl(weatherData.weather[0].icon)}/>
                <CountryDetail title="Wind Speed" content={`${weatherData.wind.speed} m/s`}/>
            </>
        )
    }
}

const SingleCountry = ({countryOfName}) => {

    const [data, setData] = useState(null)

    useEffect(() => {
        dbService
          .getCountry(countryOfName)
          .then(countries => {
            setData(countries)
          })
      }, [])

    
    if (data == null) {
        return null
    } else {
        return (
            <div>
                <h2> {data.name.common} </h2>
                <CountryDetail title="Capital" content={data.capital[0]}/>
                <CountryDetail title="Area" content={data.area}/>
                <CountryDetailList title="Languages" list={data.languages}/>
                <img src={data.flags.svg} alt={data.flags.alt} style={{ width: '150px', height: 'auto' }}></img>
                <WeatherDetail lan={data.capitalInfo.latlng[0]} 
                                lon={data.capitalInfo.latlng[1]} 
                                capital={data.capital[0]}/> 
            </div>
        )
    }
}

const CountriesListEntry = ({country, setSearch}) => {
    return (
        <p> 
            {country.name.common} 
            <button onClick={() => setSearch(country.name.common)}>show</button>
        </p>
    )
}

const Countries = ({countryList, setSearch}) => {
    // console.log(countryList)
    // console.log(countryList.length)

    if(countryList.length === 0) {
        return null
    } else if (countryList.length > 10) {
        return (
            <div> 
                <p> Too Many Countries. Specify another filter!</p>
            </div>
        )
    } else if (countryList.length > 1) {
        return (
            <div>
                {countryList.map((e) => {return <CountriesListEntry key={e.name.official} country={e} setSearch={setSearch}/>})}
            </div>
        )
    } else {
        //console.log(countryList[0].name.official)
        // dbService
        //     .getCountry(countryList[0].name.official)
        //     .then(data => {
        //         console.log(data)
        //         console.log(data.length)
        //         setData(data)
        //     })
        return (
            <>
                <SingleCountry countryOfName={countryList[0].name.official}/>
            </>
        )
    }
}

export default Countries