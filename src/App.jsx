import { FaReact } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeandLocation from "./components/TimeandLocation";
import TempandDetails from "./components/TempandDetails";
import Forecast from "./components/Forecast";
import getWeatherData from "./services/weatherservices";
import {getFormattedWeatherData} from "./services/weatherservices"
const App = () => {

  const [query,setQuery] = useState({q: 'ahmedabad'});
  const [units, setUnits] = useState('metric');
  const [weather,setWeather] = useState(null)

  const getWeather = async() =>{
    await getFormattedWeatherData( {...query,units}).then(data=>{
      setWeather(data)
    })
    console.log(data)
  }

  useEffect(()=>{getWeather()},[query,units])

  
  // getWeather()
  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32  bg-gradient-to-br  shadow-xl shadow-gray-400 from-cyan-600 to-blue-700">
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits={setUnits}/>

      {
        weather && (
          <>
          <TimeandLocation weather={weather}/>
          <TempandDetails weather={weather}/>
          <Forecast title="3 hour step forecast" data = {weather.hourly}/>
          <Forecast title="daily forecast" data= {weather.daily}/>
          </>
        )
      }
     
    </div>
  )
}

export default App