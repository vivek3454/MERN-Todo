import React, { useEffect, useState } from 'react'
import Task from '../../components/Task';
import axios from 'axios';

const Todo = () => {
  const [task, setTask] = useState('');
  const [allTodos, setAllTodos] = useState([]);

  const fetchAllTask = async () => {
    const { data: { data } } = await axios.post('https://todoblocks.onrender.com/api/auth/user', { token: sessionStorage.getItem('token') });
    const res = await axios.post('https://todoblocks.onrender.com/api/todo/allTodos', { userId: data._id, token: sessionStorage.getItem('token') });
    setAllTodos(res.data.todos)
  }

  const handleAddTask = async () => {
    if (task !== '') {
      const { data: { data } } = await axios.post('https://todoblocks.onrender.com/api/auth/user', { token: sessionStorage.getItem('token') });
      const res = await axios.post('https://todoblocks.onrender.com/api/todo/create', { task, userId: data._id, token: sessionStorage.getItem('token') });
      fetchAllTask();
      setTask('');
    }
  }


  useEffect(() => {
    fetchAllTask();
  }, [allTodos])



  return (
    <div className='h-full md:p-10 p-2 flex flex-col items-center'>
      <div className='max-w-3xl w-full'>
        <div className='flex gap-1'>
          <input value={task} onChange={(e) => setTask(e.target.value)} type="text" className='w-full h-16 px-3 rounded-md border-2' placeholder='Enter your task' />
          <button onClick={handleAddTask} className='px-5 rounded-md font-semibold bg-yellow-400'>Add</button>
        </div>
        {
          allTodos.length !== 0 ?
            <div className="mt-10 mb-16 flex flex-col items-start w-full">
              {allTodos.length !== 0 && allTodos.map((todo) => (
                <Task key={todo.todo} todo={todo} fun={fetchAllTask} />
              ))}
            </div>
            :
            <div className='mt-10 text-center'>No Tasks Found</div>
        }
      </div>
    </div>
  )
}
export default Todo