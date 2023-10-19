import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import axios from 'axios';
import spinner from '../../assets/spinner.svg';
import { useNavigate } from 'react-router-dom';

const Pending = () => {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('old');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingTask = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/pending`, { withCredentials: true });
        setIsLoading(false);
        setPendingTodos(res.data.pendingTodos);
      } catch (error) {
        setIsLoading(false);
        if (error.response.data.error) {
          navigate("/signin");
        }
      }
    }
    fetchPendingTask();

  }, [])

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  }

  // filter todos
  useEffect(() => {
    const filteredTodos = pendingTodos.slice()
      .sort((a, b) => {
        if (filterOption === 'old') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    setPendingTodos(filteredTodos);
  }, [filterOption])

  return (
    <div className='max-w-4xl w-full mx-auto relative'>
       {pendingTodos.length > 0 && <div>
        <label>
          Filter by :
          <select value={filterOption} onChange={handleFilterOptionChange}>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </label>
      </div>}
      {
        pendingTodos.length !== 0 &&
        <div className="mt-10 flex flex-col items-center w-full">
          {pendingTodos.length !== 0 && pendingTodos.map((todo) => (
            <Task key={todo.todo} todo={todo} show={true} fun={() => { }} />
          ))}
        </div>
      }
      {!isLoading && pendingTodos.length === 0 && <div className='mt-10 text-center'>No Tasks Found</div>}
      {isLoading && <div className='mt-10 flex justify-center items-center min-h-[60vh]'><img src={spinner} className='w-16' alt="spinner" /></div>}
    </div>
  )
}

export default Pending