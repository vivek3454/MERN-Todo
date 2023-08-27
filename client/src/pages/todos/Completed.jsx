import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import spinner from '../../assets/spinner.svg';

const Completed = () => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAllTask = async () => {
    const { data: { data } } = await axios.post('https://mern-todoblocks.onrender.com/api/auth/user', { token: sessionStorage.getItem('token') });
    const res = await axios.post('https://mern-todoblocks.onrender.com/api/todo/allTodos', { userId: data._id, token: sessionStorage.getItem('token') });
    setCompletedTodos(res.data.todos)
  }
  useEffect(() => {
    const fetchCompletedTask = async () => {
      const res = await axios.post('https://mern-todoblocks.onrender.com/api/todo/completed', { token: sessionStorage.getItem('token') });
      setIsLoading(false);
      setCompletedTodos(res.data.completedTodos);
    }
    fetchCompletedTask();

  }, [])
  
  return (
      <div className='max-w-4xl w-full mx-auto'>
        {
          completedTodos.length !== 0 &&
            <div className="mt-10 flex flex-col items-center w-full">
              {completedTodos.length !== 0 && completedTodos.map((todo) => (
                <Task key={todo.todo} todo={todo} show={true} fun={fetchAllTask} />
              ))}
            </div>
          }
          {!isLoading && <div className='mt-10 text-center'>No Tasks Found</div>}
          {isLoading && <div className='mt-10 flex justify-center items-center min-h-[60vh]'><img src={spinner} className='w-16' alt="spinner" /></div>}
      </div>
  )
}

export default Completed