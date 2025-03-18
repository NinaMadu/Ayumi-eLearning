import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice.js'
import Header from '../components/Header.jsx';



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
      <div className="flex items-center justify-end min-h-screen bg-cover bg-center bg-no-repeat " style={{ background: `url('../src/assets/bg2.jpg')`, opacity: 0.9 }}>
        <div className="bg-white bg-opacity-50 p-10 rounded-lg shadow-lg max-w-lg w-full h-full mr-40 " >

          <form onSubmit={handleSubmit} className="bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-lg w-full h-50">
            <div>
              <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">Login</h1>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              <div className="mb-4">
                <label htmlFor="email"
                  className="block text-sm font-medium text-blue-900 text-base"
                >Email</label>
                <input type="email" id="email"
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your User Name or Email" onChange={handleChange} />
              </div>

              <div >
                <label htmlFor="password"
                  className="block text-sm font-medium text-blue-900  text-base"
                >Password</label>
                <input type="password" id="password"
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              <button className="w-64 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
            <div className="mt-6 text-center">
              <span className="text-sm text-blue-900 opacity-80">Don't have an account? <Link to='/Sign-up' className="font-medium text-blue-900 hover:text-blue-600 text-base">Create an account</Link></span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
