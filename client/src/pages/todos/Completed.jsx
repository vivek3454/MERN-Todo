import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import spinner from '../../assets/spinner.svg';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('old');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCompletedTask = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/completed`, { withCredentials: true });
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

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  }

  // filter todos
  useEffect(() => {
    const filteredTodos = completedTodos.slice()
      .sort((a, b) => {
        if (filterOption === 'old') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    setCompletedTodos(filteredTodos);
  }, [filterOption])

  return (
    <div className='max-w-4xl w-full mx-auto relative'>
      {completedTodos.length > 0 && <div>
        <label>
          Filter by :
          <select value={filterOption} onChange={handleFilterOptionChange}>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </label>
      </div>}
      {
        completedTodos.length !== 0 &&
        <div className="mt-10 flex flex-col items-center w-full">
          {completedTodos.length !== 0 && completedTodos.map((todo) => (
            <Task key={todo.todo} todo={todo} show={true} fun={()=>{}} />
          ))}
        </div>
      }
      {!isLoading && completedTodos.length === 0 && <div className='mt-10 text-center'>No Tasks Found</div>}
      {isLoading && <div className='mt-10 flex justify-center items-center min-h-[60vh]'><img src={spinner} className='w-16' alt="spinner" /></div>}
    </div>
  )
}

export default Completed