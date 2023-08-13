import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Todo from './Todo';
import Welcome from './Welcome';
import Pending from './Pending';
import Completed from './Completed';
import Profile from '../auth/Profile';
import { FcTodoList } from 'react-icons/fc';
import { IoMdDoneAll } from 'react-icons/io';
import { MdPendingActions } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import Navbar from '../../components/Navbar';

const Home = () => {
    const { pathname } = useLocation();
    return (
        <>
            <Navbar />
            <div className='flex h-[90vh]'>
                <div className='w-64 shadow-[0px_10px_8px_#00000032] p-5 md:p-10 bg-white flex justify-center text-lg font-semibold max-[768px]:absolute bottom-0 left-0 right-0 max-[768px]:w-full'>
                    <div className='flex flex-col gap-5 max-[768px]:flex-row'>
                        <Link to={'/todo'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/todo' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <FcTodoList className='text-3xl md:text-2xl' />
                            <span className='max-[500px]:hidden'>Todos</span>
                        </Link>
                        <Link to={'/completed'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/completed' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <IoMdDoneAll size={23} />
                            <span className='max-[500px]:hidden'>Completed</span>
                        </Link>
                        <Link to={'/pending'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/pending' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <MdPendingActions size={23} />
                            <span className='max-[500px]:hidden'>Pending</span>
                        </Link>
                        <Link to={'/profile'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/profile' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <ImProfile size={23} />
                            <span className='max-[500px]:hidden'>Profile</span>
                        </Link>
                    </div>
                </div>
                <div className='max-w-7xl w-full p-8'>

                    <Routes>
                        <Route index path='/' element={<Welcome />} />
                        <Route path='/todo' element={<Todo />} />
                        <Route path='/completed' element={<Completed />} />
                        <Route path='/pending' element={<Pending />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Home