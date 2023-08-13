import React from 'react'
import {FaTrash,FaEdit} from 'react-icons/fa'

const Task = () => {
  return (
      <div className='max-w-3xl mb-5 w-full flex gap-1'>
        <div className='w-full h-16 px-3 flex justify-between items-center rounded-md border-2' >
          <div>Task1</div>
          <div className='flex gap-5 items-center'>
          <FaEdit className='cursor-pointer text-xl' />
          <FaTrash className='cursor-pointer text-lg' />
          </div>
        </div>
      </div>
  )
}

export default Task