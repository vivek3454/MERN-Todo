import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from '../../assets/profile.png'

const Profile = () => {
    const navigate = useNavigate();
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [user, setUser] = useState({ name: '', email: '' });

    const handleLogout = async (e) => {
        if (e.target.textContent === 'Yes') {
            await axios.get('http://localhost:5000/api/auth/logout');
            setLogoutPopup(false);
            navigate('/signin');
        }
        else {
            setLogoutPopup(false);
        }
    }


    const fetchUserDetail = async () => {
        const { data: { data } } = await axios.post('http://localhost:5000/api/auth/user', { token: sessionStorage.getItem('token') });
        setUser({ name: data.name, email: data.email });
    }
    useEffect(() => {
        fetchUserDetail();

    }, [])

    const handleOnChange = (e) => {
        setUpdatedName(e.target.value)
    }

    const handleProfileUpdate = async (e) => {
        if (updatedName === '') {
            // return;
        }
        if (e.target.textContent === 'Submit' && updatedName !== '') {
            const data = await axios.post('http://localhost:5000/api/auth/updatUserProfile', { name: updatedName, email: user.email, token: sessionStorage.getItem('token') });
            fetchUserDetail()
            setIsUpdate(false);
            setUpdatedName('');
        }
        else if(e.target.textContent === 'Cancel'){
            setIsUpdate(false);
            setUpdatedName('');
        }
    }

    return (
        <div className='h-full flex justify-center items-center relative'>
            <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                    <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={profile} />
                    {isUpdate ?
                        <div onClick={handleProfileUpdate} className='flex flex-col gap-4'>
                            <input type="text" className='border-2 px-2' placeholder='Enter your name' onChange={handleOnChange} value={updatedName} />
                            <button className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md'>Cancel</button>
                            <button className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md'>Submit</button>
                        </div>
                        :
                        <div className="w-full">
                            <h2 className="title-font font-medium text-lg text-gray-900">{user.name}</h2>
                            <h3 className="text-gray-500 mb-3">{user.email}</h3>
                            <button onClick={() => setIsUpdate(true)} className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md'>Update Profile</button>
                        </div>
                    }
                </div>
            </div>

            <button onClick={() => setLogoutPopup(true)} className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md absolute right-3 top-2'>LogOut</button>

            {logoutPopup && <div className='w-60 rounded-md bg-white shadow-2xl p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <p className='mb-6 font-semibold'>Are you sure to Logout?</p>
                <div onClick={handleLogout} className='flex justify-between gap-5'>
                    <button className='px-3 rounded-md bg-yellow-400 hover:bg-yellow-300'>No</button>
                    <button className='px-3 rounded-md bg-yellow-400 hover:bg-yellow-300'>Yes</button>
                </div>
            </div>}
        </div>
    )
}

export default Profile