import axios from 'axios';
import React, { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'

const Task = ({ todo, fun }) => {
  const [isInputBox, setIsInputBox] = useState(false);
  const [inputBoxValue, setInputBoxValue] = useState('');
  const handleUpdate = (id)=>{
    console.log(id);
  }
  const handleUpdateBoxOpen = ()=>{
    setIsInputBox(true);
    setInputBoxValue(todo.todo);
  }
  const handleSubmit = async ()=>{
    const res = await axios.post('http://localhost:5000/api/todo/update', { todo:inputBoxValue, _id: todo._id, token: sessionStorage.getItem('token') });
    fun();
    setIsInputBox(false);
  }

  const handleOnchange = (e)=>{
    setInputBoxValue(e.target.value);
  }
  const handleDelete = async (id)=>{
    await axios.post('http://localhost:5000/api/todo/delete', { _id: id, token: sessionStorage.getItem('token') });
    fun();
  }
  return (
    <div className='max-w-3xl mb-5 w-full flex gap-1'>
      <div className='w-full h-16 px-3 flex justify-between items-center rounded-md border-2' >
        <div className='flex gap-2 items-center'>
        <input type="checkbox" className='accent-yellow-400' width={20} height={30} />
        {!isInputBox && <div>{todo.todo}</div>}
        {isInputBox && <input type="text" value={inputBoxValue} onChange={(e)=>handleOnchange(e)} className='border-2 px-2 w-80 w-full' />}
        </div>
        <div className='flex gap-5 items-center'>
          {isInputBox &&
          <div>
           <button onClick={handleSubmit} className='px-1 mr-2 bg-yellow-400 rounded-md font-semibold'>Submit</button>
           <button onClick={()=>setIsInputBox(false)} className='px-1 bg-yellow-400 rounded-md font-semibold'>Cancel</button>
          </div>
           }
          {!isInputBox && <FaEdit onClick={()=> handleUpdateBoxOpen(todo._id)} className='cursor-pointer text-xl' />}
          <FaTrash onClick={()=> handleDelete(todo._id)} className='cursor-pointer text-lg' />
        </div>
      </div>
    </div>
  )
}

export default Task