import React, { useEffect, useState } from 'react'
import Task from '../../components/Task';
import axios from 'axios';

const Pending = () => {
  const [pendingTodos, setPendingTodos] = useState([]);
  useEffect(() => {
    const fetchPendingTask = async () => {
      const res = await axios.post('http://localhost:5000/api/todo/pending', { token: sessionStorage.getItem('token') });
      setPendingTodos(res.data.pendingTodos);
    }
    fetchPendingTask();

  }, [])
  
  return (
      <div className='max-w-4xl w-full'>
        {
          pendingTodos.length !== 0 ?
            <div className="mt-10 flex flex-col items-start w-full">
              {pendingTodos.length !== 0 && pendingTodos.map((todo) => (
                <Task key={todo.todo} todo={todo} />
              ))}
            </div>
            :
            <div className='mt-10 text-center'>No Tasks Found</div>
          }
      </div>
  )
}

export default Pending