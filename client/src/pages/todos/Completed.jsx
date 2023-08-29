import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import spinner from '../../assets/spinner.svg';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('new');
  const navigate = useNavigate();
  const fetchAllTask = async () => {
    const { data: { data } } = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/user`, { token: sessionStorage.getItem('token') });
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/allTodos`, { userId: data._id, token: sessionStorage.getItem('token') });
    setCompletedTodos(res.data.todos);
  }
  useEffect(() => {
    const fetchCompletedTask = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/completed`, { token: sessionStorage.getItem('token') });
        setIsLoading(false);
        setCompletedTodos(res.data.completedTodos);
      } catch (error) {
        setIsLoading(false);
        if (error.response.data.error) {
          navigate("/login");
        }
      }
    }
    fetchCompletedTask();
  }, [])

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  }

  useEffect(() => {
    const filteredTodos = completedTodos.slice()
      .sort((a, b) => {
        if (filterOption === 'old') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    setCompletedTodos(filteredTodos)
  }, [filterOption])

  return (
    <div className='max-w-4xl w-full mx-auto relative'>
      {
        completedTodos.length !== 0 &&
        <div className="mt-10 flex flex-col items-center w-full">
          {completedTodos.length !== 0 && completedTodos.map((todo) => (
            <Task key={todo.todo} todo={todo} show={true} fun={fetchAllTask} />
          ))}
        </div>
      }
      {!isLoading && completedTodos.length === 0 && <div className='mt-10 text-center'>No Tasks Found</div>}
      {isLoading && <div className='mt-10 flex justify-center items-center min-h-[60vh]'><img src={spinner} className='w-16' alt="spinner" /></div>}
      {completedTodos.length > 0 && <div className='absolute -top-10 left-16'>
        <label>
          Filter by :
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </label>
      </div>}
    </div>
  )
}

export default Completed