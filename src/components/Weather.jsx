import { useEffect, useState } from 'react'
import axios from 'axios';
import sun from '../assets/sun.png'
import rain from '../assets/rain.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'

const Weather = () => {
    const [data, setData] = useState()
    
    // useEffect(() => {
    // fetch ('http://ip-api.com/json/')
    //     .then ((res) => res.json())
    //     .then((data) => {

    //     const url = `https://api.openweathermap.org/data/2.5/weather?lat=36.175&lon=-115.1372&appid=9b14fd1e843a8e05c61d2a814c1d5568&units=metric`

    //     // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=9b14fd1e843a8e05c61d2a814c1d5568&units=metric`

    //         axios.get(url).then((response) => {
    //             setData(response.data)
    //             console.log(response.data);
    //         })
    //     })
    // }, [])

    useEffect(() => {
        const fetchWeather = async () => {
          try {
            // Fetch user location using IP API
            const locationResponse = await axios.get('https://ip-api.com/json/');
    
            // Build dynamic weather API URL using location data
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${locationResponse.data.lat}&lon=${locationResponse.data.lon}&appid=9b14fd1e843a8e05c61d2a814c1d5568&units=metric`;
    
            // Fetch weather data
            const weatherResponse = await axios.get(url);
    
            setData(weatherResponse.data);

          } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle errors (optional: display an error message to the user)
          }
        };
    
        fetchWeather();
      }, []); // Empty dependency array to run only on initial mount
    


    
  return (
    <div className='font-output flex flex-col justify-center items-center'>
    {data ? (
        <>   
            <h2 className='text-cyan-100 text-2xl lg:text-4xl'>Today is a {data.weather[0].main } day in {data.name}</h2>
            <span className='flex items-center space-x-3'><img
            src= {
                data.weather[0].main === 'Clouds' ? cloud
                : data.weather[0].main === 'Rain' ? rain
                : data.weather[0].main === 'Clear' ? clear
                : data.weather[0].main === 'Sunny' ? sun : null}
                alt="" width={100}/><h2 className='text-cyan-300 text-5xl lg:text-7xl font-bold'>{data ? data.main.temp.toFixed() : null}°C</h2></span>
        </>
    ) : (
        <p className='text-cyan-100 text-2xl lg:text-4xl'>Loading weather data...</p>
    )}
            </div>
  )

}

export default Weather
