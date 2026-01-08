import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_SOME_KEY

let cache = {}

const getWeather = ({lat, lon}) => {
    if (cache[`${lat},${lon}`]) {
        console.log("Getting weather and hitting cache")
        return Promise.resolve(cache[`${lat},${lon}`])
    } else {
        console.log("Querrying Weather")
        const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        return request.then(response => {
            cache[`${lat},${lon}`] = response
            return response
        })
    }
}

const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export default { 
    getWeather,
    getWeatherIconUrl
}