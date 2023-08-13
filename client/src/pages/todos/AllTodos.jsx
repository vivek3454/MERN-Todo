import React, { useEffect, useState } from 'react'
import Task from '../../components/Task';
import axios from 'axios';

const Todo = () => {
  const [task, setTask] = useState('');

  const fetchAllTask = async () => {}
  const handleAddTask = async () => {
    if (task !== '') {
      const { data: { data } } = await axios.post('http://localhost:5000/api/auth/user', { token: sessionStorage.getItem('token') });
      const res = await axios.post('http://localhost:5000/api/todo/create', { task, userId: data._id, token: sessionStorage.getItem('token') });
      setTask('');
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className='h-full p-10 flex flex-col items-center'>
      <div className='max-w-4xl w-full'>
        <div className='flex gap-1'>
          <input value={task} onChange={(e) => setTask(e.target.value)} type="text" className='w-full h-16 px-3 rounded-md border-2' placeholder='Enter your task' />
          <button onClick={handleAddTask} className='px-5 rounded-md font-semibold bg-yellow-400'>Add</button>
        </div>
        <div className="mt-10 flex flex-col items-start w-full">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      </div>
    </div>
  )
}

export default Todo