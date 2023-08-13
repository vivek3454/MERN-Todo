import React from 'react';
import { ImProfile } from 'react-icons/im';
import {FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="text-gray-600 shadow-[10px_0px_6px_#00000032]">
            <div className="container mx-auto flex flex-wrap justify-between p-4 flex-col md:flex-row items-center">
                <Link to={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-yellow-400 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl"><span className='text-yellow-400'>Todo</span>blocks</span>
                </Link>
               
                <Link to={'/profile'} className="inline-flex items-center justify-center text-yellow-400 border-0 w-10 h-10 rounded-full focus:outline-none hover:scale-105 text-base mt-4 md:mt-0">
                   <FaUserCircle size={28} />
                </Link>
            </div>
        </header>
    )
}

export default Navbar