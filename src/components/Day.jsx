import { useState, useEffect} from 'react'


const Day = () => {

    const  [time, setTime] = useState(new Date())
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    function formatDate() {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
        const dayOfWeek = daysOfWeek[date.getDay()]
        const day = date.getDate()
        const month = date.getMonth() +1
        const year = date.getFullYear()

        return `${dayOfWeek} ${day}-${month}-${year}`
    }

    function formatTime() {
        let hours = time.getHours()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        const meridian = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12 || 12

        return {hours, minutes, seconds, meridian}
    }

    const {hours, minutes, seconds, meridian} = formatTime()

    function padZero(number) {
       return (number < 10 ? '0' : '') + number 
    }
  return (
    <div className='flex flex-col items-center justify-center my-4'>
        <div className='flex flex-col justify-center items-center my-4 text-pink-800'>
        <p className='text-4xl font-bold tracking-wider lg:text-6xl'>{`${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridian}`}</p>
        <p className='text-xl font-bold lg:text-3xl'>{formatDate()}</p>
        </div>
        <div>
            <p className='flex justify-center items-center gap-3'>
                <span className='text-2xl font-semibold text-white lg:text-4xl tracking-wider '>Good {
                hours < 12 && meridian === 'AM' ? 'Morning'
                : hours < 6 && meridian === 'PM' ? 'Afternoon'
                : hours >= 6 && hours < 12 && meridian === 'PM' ? 'Evening' 
                : 'Night'}</span>
                <span className='font-output text-4xl font-extrabold text-indigo-700 lg:text-7xl'>DevLeon</span>
             </p>
        </div>
    </div>
  )
}

export default Day
