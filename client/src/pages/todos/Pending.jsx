import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import axios from 'axios';
import spinner from '../../assets/spinner.svg';

const Pending = () => {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAllTask = async () => {
    const { data: { data } } = await axios.post('https://mern-todoblocks.onrender.com/api/auth/user', { token: sessionStorage.getItem('token') });
    const res = await axios.post('https://mern-todoblocks.onrender.com/api/todo/allTodos', { userId: data._id, token: sessionStorage.getItem('token') });
    setPendingTodos(res.data.todos)
  }
  useEffect(() => {
    const fetchPendingTask = async () => {
      const res = await axios.post('https://mern-todoblocks.onrender.com/api/todo/pending', { token: sessionStorage.getItem('token') });
      setIsLoading(false);
      setPendingTodos(res.data.pendingTodos);
    }
    fetchPendingTask();

  }, [])
  
  return (
      <div className='max-w-4xl w-full mx-auto'>
        {
          pendingTodos.length !== 0 &&
            <div className="mt-10 flex flex-col items-center w-full">
              {pendingTodos.length !== 0 && pendingTodos.map((todo) => (
                <Task key={todo.todo} todo={todo} show={true} fun={fetchAllTask} />
              ))}
            </div>
          }
          {!isLoading && pendingTodos.length === 0 && <div className='mt-10 text-center'>No Tasks Found</div>}
          {isLoading && <div className='mt-10 flex justify-center items-center min-h-[60vh]'><img src={spinner} className='w-16' alt="spinner" /></div>}
      </div>
  )
}

export default Pending