import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Jaipur')
    const [thisLocation, setLocation] = useState('')

    // fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
             url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            // url : 'https://weather-api167.p.rapidapi.com/api/weather/forecast',
           
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 'false',
            },
            headers: {
                 'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
                
            },
        }

        try {
            const response = await axios.request(options);
            console.log(response.data)
            const thisData = Object.values(response.data.locations)[0]
            setLocation(thisData.address)
            setValues(thisData.values)
            setWeather(thisData.values[0])
        } catch (e) {
            // console.error(e);
            // // if the api throws error.
            // alert('This place does not exist')
           
                console.error('Error fetching weather data:', e);
                alert(e.response?.data?.message || 'Failed to fetch weather data. Please check the location or try again.')
            }
            
        }
    

    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)