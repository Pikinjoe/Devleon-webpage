import { useState, useEffect} from 'react'
import arrow from '../assets/arrowGreen.png'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'


const Todo = () => {
    const [openTodo, setOpenTodo] = useState(true)

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('todo')) || []);
    const [newTask, setNewTask] = useState('')
    const [completeTasks, setCompleteTasks] = useState(JSON.parse(localStorage.getItem('completeTodo')) || [])
   
    // Save tasks to local storage on changes
    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('completeTodo', JSON.stringify(completeTasks));
    }, [completeTasks]);


    function inputChange(e) {
        setNewTask(e.target.value)
    }
    function addTask() {
        if (newTask.trim() !== '') {
            setTasks(t => [...t, newTask]);
            setNewTask('')
            
        }
    }
    function addCompleteTask(index) {
        const completedTask = tasks[index];
        setCompleteTasks(c => [...c, completedTask]);
        setTasks(t => t.filter((_, i) => i !== index));
    }
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    function deleteTask(index) {
        setTasks(t => t.filter((_, i) => i !== index))
    } 

    function clearTask() {
        setCompleteTasks([])
    }
  return (
    <div>
        <div className='flex justify-center items-center gap-4'>
            <p className='uppercase font-mono text-xl text-cyan-200 tracking-widest'>What are we doing today?</p>
            <input type="text" value={newTask} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => inputChange(e)} className='bg-transparent border-b-2 outline-none text-cyan-50' />
            <button onClick={addTask} className='active:translate-x-1'><img src={arrow} alt="" width={40} /></button>
        </div>

       <div className='flex justify-center items-center'>
            <button className='w-32 h-12 p-2 bg-blue-700 rounded-lg opacity-50 flex items-center justify-center text-cyan-100 my-6' onClick={() => {
                setOpenTodo(!openTodo)
            }}>
              {openTodo ? 'Close Todo': 'Open Todo'} 
            </button>

       </div>
        <div  className={`transition-all duration-700 ease-in-out delay-300 ${
                    openTodo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
                } w-1/2 lg:w-2/5 bg-gray-500 h-screen absolute top-0 right-0`}>

          <div className='flex flex-col gap-10'>
                <div>
                    <h2 className='uppercase text-center my-5 text-xl font-semibold text-indigo-900'>completed tasks</h2>
                    <hr className='border border-purple-700'/>
                    <ol className='my-10'>
                        {completeTasks.map((completeTask, i) => <li className='capitalize text-green-900 font-medium text-lg list-decimal ml-5' key={i}>{completeTask}</li>)}
                        
                    </ol>
                    <button className='font-medium bg-red-400 rounded-full py-2 px-4 text-cyan-50 ' onClick={clearTask}>Clear</button>
                </div>

                <div>
                    <h2 className='uppercase text-center my-5 text-xl font-semibold text-indigo-900'>Today tasks</h2>
                    <hr className='border border-purple-700'/>
                    <ol className='my-10 flex flex-col gap-4'>
                        {tasks.map((task, index) => <li className='capitalize text-cyan-50 font-medium text-lg list-decimal ml-5'>
                            <p className='flex justify-between items-center' key={index}>{task}
                                <div className='mr-2 flex items-center gap-3'>
                                     <button className='bg-red-700 p-2 rounded-lg h-10 flex justify-center items-center' onClick={() => deleteTask(index)}>Delete</button> <button className='bg-green-700 p-2 rounded-lg h-10 flex justify-center items-center' onClick={() => addCompleteTask(index)}>Done</button>
                                </div>
                            </p>
                        </li>
                        )}
                        
                    </ol>
                </div>
          </div>
        </div>
        
    </div>
  )
}

export default Todo