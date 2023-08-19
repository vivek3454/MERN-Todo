import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ name: "", username: "", email: "", password: "", bio: "" });
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://mern-todoblocks.onrender.com/api/auth/signup', { ...userInfo });
            navigate("/signin");

        } catch (error) {
            setErrorMessage(error.response.data.message);
        }

    }
    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className=" rounded shadow-[0px_0px_15px_#00000032] p-8 w-96">
                <form action="" onSubmit={handleFormSubmit}>
                    <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">SignUp</h2>

                    <div className="relative mb-4">
                        <input type="text" onChange={handleOnChange} value={userInfo.name} required id='name' name="name" placeholder='Enter your name' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <input type="email" onChange={handleOnChange} value={userInfo.email} required id='email' name="email" placeholder='Enter your email' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <input type="password" onChange={handleOnChange} value={userInfo.password} required id='password' name="password" placeholder='Enter your password' autoComplete='false' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {errorMessage && <p className="mb-3 text-sm text-red-600">*{errorMessage}</p>}
                    <div className='flex justify-center'>
                        <button type='submit' className="text-white bg-[#4CB5F9] active:bg-[#4CB5F9] border-0 w-full py-1 px-8 focus:outline-none hover:bg-[#369fe6] rounded-xl text-lg">Sign up</button>

                    </div>
                </form>
                <p className="text-gray-500 mt-3 text-center text-sm">Already have account? <Link to={'/signin'} className="text-blue-600" >Log in</Link></p>
            </div>
        </section>
    )
}

export default SignUp