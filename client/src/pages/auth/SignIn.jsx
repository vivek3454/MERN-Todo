import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/signin`, { ...userInfo, }, { credentials: 'true' });
            sessionStorage.setItem('token', res.data.token);
            navigate("/");

        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="shadow-[0px_0px_15px_#00000032] rounded p-8 w-96">
                <form action="" onSubmit={handleFormSubmit}>
                    <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">Login</h2>
                    <div className="relative mb-4">
                        <input type="email" onChange={handleOnChange} value={userInfo.email} placeholder='Enter your email' autoComplete='false' id="email" name="email" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <input type="password" onChange={handleOnChange} value={userInfo.password} placeholder='Enter your password' autoComplete='false' id="password" name="password" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {errorMessage && <p className="mb-3 text-sm text-red-600">*{errorMessage}</p>}
                    <div className='flex justify-center'>
                        <button className="text-white bg-[#4CB5F9] active:bg-[#4CB5F9] border-0 w-full py-1 px-8 focus:outline-none hover:bg-[#369fe6] rounded-xl text-lg">Log in</button>
                    </div>
                    <p className="text-gray-500 mt-3 text-center text-sm">Do not have account? <Link to={'/signup'} className="text-blue-600" >Sign Up</Link></p>

                </form>
            </div>
        </section>
    )
}

export default SignIn