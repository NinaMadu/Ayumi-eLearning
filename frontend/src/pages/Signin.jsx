import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice.js'
import Header from '../components/Header.jsx';

import bg2 from '../assets/bg2.jpg';

export default function Signin() {
  
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    dispatch(signInFailure(null)); 
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }

      localStorage.setItem('userId', data._id);
      dispatch(signInSuccess(data));

      if (data.isInstructor) {
        navigate('/instructor/dashboard');
      } else {
        navigate('/user/dashboard');
      }
      
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  }


  return (
    <>
    <Header/>
      <div className="flex items-center justify-end min-h-screen bg-center bg-no-repeat bg-cover " style={{ backgroundImage: `url(${bg2})`, opacity: 0.9 }}>
        <div className="w-full h-full max-w-lg p-10 mr-40 bg-white bg-opacity-50 rounded-lg shadow-lg " >

          <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white bg-opacity-100 rounded-lg shadow-lg h-50">
            <div>
              <h1 className="mb-6 text-4xl font-bold text-center text-blue-900">Login</h1>

              {error && <p className="mb-4 text-red-500">{error}</p>}
              
              <div className="mb-4">
                <label htmlFor="email"
                  className="block text-sm text-base font-medium text-blue-900"
                >Email</label>
                <input type="email" id="email"
                  className="block w-full px-3 py-2 mt-1 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your User Name or Email" onChange={handleChange} />
              </div>

              <div >
                <label htmlFor="password"
                  className="block text-sm text-base font-medium text-blue-900"
                >Password</label>
                <input type="password" id="password"
                  className="block w-full px-3 py-2 mt-1 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password" onChange={handleChange} />
              </div>
                
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="mr-2"
                />
                <span className="text-sm text-blue-900">Remember me</span>
              </label>
              <Link to={"/forget-password"} className="text-sm text-blue-900 hover:text-blue-500">Forgot Password?</Link>
            </div>
            <div className="flex justify-center">
              <button className="flex justify-center w-64 px-4 py-2 text-sm text-lg font-bold text-white bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
            <div className="mt-6 text-center">
              <span className="text-sm text-blue-900 opacity-80">Don't have an account? <Link to='/Sign-up' className="text-base font-medium text-blue-900 hover:text-blue-600">Create an account</Link></span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
