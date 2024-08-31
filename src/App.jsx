import { useState } from 'react'
import Weather from './components/Weather'
import Day from './components/Day' 
import Todo from './components/Todo'
import backvid from './assets/bacvid.mp4'

function App() {

  return (
    <div>
    <video src={backvid} autoPlay loop muted className='h-screen w-full absolute top-0 left-0 object-cover object-center -z-10' />
    <div className='flex flex-col justify-center items-center my-20'>
    <Weather />
    <Day />
    <Todo /> 
    </div>
    </div>
  )
}

export default App
