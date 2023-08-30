import axios from 'axios';
import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ todo, fun, show = false }) => {
  const [isInputBox, setIsInputBox] = useState(false);
  const [inputBoxValue, setInputBoxValue] = useState('');

  const handleUpdateBoxOpen = () => {
    setIsInputBox(true);
    setInputBoxValue(todo.todo);
  }

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleSubmit = async () => {
    if (inputBoxValue !== todo.todo) {
      try {
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/update`, { todo: inputBoxValue, _id: todo._id, token: sessionStorage.getItem('token') });
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
        fun();
        setIsInputBox(false);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    else {
      toast.error('please enter new todo value', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  const handleCheckboxOnchange = async (e) => {
    let checked = e.target.checked;
    try {

      if (checked) {
        await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/status`, { _id: todo._id, completed: true, token: sessionStorage.getItem('token') });
      }
      else {
        await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/status`, { _id: todo._id, completed: false, token: sessionStorage.getItem('token') });
      }
      fun();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleOnchange = (e) => {
    setInputBoxValue(e.target.value);
  }
  const handleDelete = async (id) => {
    try {

      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/todo/delete`, { _id: id, token: sessionStorage.getItem('token') });
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
      fun();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <div className='max-w-3xl mb-5 w-full flex gap-1 relative'>
      <div className='w-full h-16 px-3 flex justify-between items-center rounded-md border-2' >
        <div className='flex gap-2 items-center'>
          {!show && <input onChange={handleCheckboxOnchange} checked={todo.completed} type="checkbox" className={`accent-yellow-400`} width={20} height={30} />}
          {!isInputBox && <div className={`${todo.completed ? 'line-through' : ''}`} >{todo.todo}</div>}
          {isInputBox && <input type="text" value={inputBoxValue} onChange={(e) => handleOnchange(e)} className='border-2 px-2 w-80' />}
        </div>
        <div className='flex gap-5 items-center'>
          {isInputBox &&
            <div>
              <button onClick={handleSubmit} className='px-1 mr-2 bg-yellow-400 rounded-md font-semibold'>Submit</button>
              <button onClick={() => setIsInputBox(false)} className='px-1 bg-yellow-400 rounded-md font-semibold'>Cancel</button>
            </div>
          }
          {!isInputBox && !show && <FaEdit onClick={() => handleUpdateBoxOpen(todo._id)} className='cursor-pointer text-xl' />}
          <FaTrash onClick={() => handleDelete(todo._id)} className='cursor-pointer text-lg' />
        </div>
        <span className='absolute right-2 bottom-0 text-sm'>{getTimeAgo(todo.createdAt)}</span>
      </div>
    </div>
  )
}

export default Task