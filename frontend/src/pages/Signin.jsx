import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice.js'



export default function Signin() {

  /*const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  



  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        dispatch(signInStart());

        const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
         
        if (!res.ok || data.success === false) {
          throw new Error(data.message || 'Failed to sign in');
        }

        dispatch(signInSuccess(data));
        navigate("/");


      } catch (error) {
       dispatch(signInFailure(error.message));
      }

    
  };*/


  return (
    <>    
    <div class="flex items-center justify-end min-h-screen bg-cover bg-center bg-no-repeat " style={{ background: `url('../src/assets/bg2.jpg')`, opacity:0.9 }}>
      <div  class="bg-white bg-opacity-50 p-10 rounded-lg shadow-lg max-w-lg w-full h-full mr-40 " >

      <form onSubmit={handleSubmit} class="bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-lg w-full h-50">
      <div>
        <h1 class="text-4xl font-bold text-center mb-6 text-blue-900">Login</h1>

        <div class="mb-4">
          <label htmlFor="" 
          class="block text-sm font-medium text-blue-900 text-base" 
          for="email">Email</label>
          <input type="email" id="email" 
          class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          placeholder="Enter your User Name or Email" onChange={handleChange}/>
        </div>

        <div >
        <label htmlFor="" 
        class="block text-sm font-medium text-blue-900  text-base" 
        for="password">Password</label>
        <input type="password" id="password" 
        class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
        placeholder="Enter your password" onChange={handleChange}/>
        </div>

      </div>

      <div class="flex items-center justify-between mb-6">
      <label className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="mr-2"
              />
              <span className="text-sm text-blue-900">Remember me</span>
            </label>
        <span class="text-sm text-blue-900 hover:text-blue-500">Forgot Password?</span>
      </div>
      <div class="flex justify-center">
             <button class="w-64 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  text-lg">
              Login
            </button>
      </div>
      <div class="mt-6 text-center">
        <span  class="text-sm text-blue-900 opacity-80">Don't have an account? <Link to='/Sign-up' class="font-medium text-blue-900 hover:text-blue-600 text-base">Create an account</Link></span>
      </div>
      </form>
      </div>     
    </div>
    </>
  )
}
