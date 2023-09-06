import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import axios from 'axios';
import { toast } from 'react-toastify';
import spinner from '../../assets/spinner.svg';

const Todo = () => {
  const [task, setTask] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('new');

  const fetchAllTask = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/allTodos`, { withCredentials: true });
      setIsLoading(false);
      setAllTodos(res.data.todos);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const filteredTodos = allTodos.slice()
      .sort((a, b) => {
        if (filterOption === 'old') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    setAllTodos(filteredTodos);
  }, [filterOption])

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  }

  const handleAddTask = async () => {
    if (task !== '') {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/create`, { task }, {withCredentials: true});
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      fetchAllTask();
      setTask('');
    }
  }


  useEffect(() => {
    fetchAllTask();
  }, [allTodos])



  return (
    <div className='h-full md:p-10 p-2 flex flex-col items-center relative'>
      <div className='max-w-3xl w-full'>
        <div className='flex gap-1'>
          <input value={task} onChange={(e) => setTask(e.target.value)} type="text" className='w-full h-16 px-3 rounded-md border-2' placeholder='Enter your task' />
          <button onClick={handleAddTask} className='px-5 rounded-md font-semibold bg-yellow-400'>Add</button>
        </div>
        {
          allTodos.length !== 0 ?
            <div className="mt-10 mb-16 flex flex-col items-start w-full">
              {allTodos.length !== 0 && allTodos.map((todo, index) => (
                <Task key={index} todo={todo} fun={fetchAllTask} />
              ))}
            </div>
            :
            (isLoading) ? <div className='mt-10 flex justify-center items-center min-h-[60vh]'><img src={spinner} className='w-16' alt="spinner" /></div>
              :
              <div className='mt-10 text-center'>No Tasks Found</div>
        }
      </div>
      <div className='absolute top-0 left-[204px]'>
        <label>
          Filter by :
          <select value={filterOption} onChange={handleFilterOptionChange}>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </label>
      </div>
    </div>
  )
}
export default Todo