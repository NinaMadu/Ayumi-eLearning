import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Notification from '../components/Notification';

import bg1 from '../assets/bg1.jpg';

export default function Signup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bDay: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setMessage("Passwords do not match!");
      setShowError(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        setMessage(data.message);
        setShowError(true);
        return;
      }

      setLoading(false);
      setError(null);
      // setError(error.message);
      navigate("/sign-in", { state: { successMessage: "Signup successful!" } });


    } catch (error) {
      setLoading(false);
      setError(error.message);
      setMessage(error.message);
      setShowError(true);
    }
    setError(null);
    setLoading(false);
    setMessage("Registration successful! Please check your email to verify your account.");
    setShowSuccess(true);


    // Optional: clear form
    setFormData({
      firstName: "",
      lastName: "",
      bDay: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

  };

  return (
    <div>
    <Header/>
    <div className="flex items-center justify-front min-h-screen bg-cover bg-center bg-no-repeat bg-opacity-90" style={{ backgroundImage: `url(${bg1})`,opacity:0.9 }} >
      <div  class="bg-white bg-opacity-50 p-10 rounded-lg shadow-lg max-w-3xl w-full h-full ml-20 mt-20" >



          {showError && (
            <Notification
              type="fail"
              message={message}
              onClose={() => setShowError(false)}
            />
          )}
          {showSuccess && (
            <Notification
              type="success"
              message={message}
              onClose={() => setShowSuccess(false)}
            />
          )}

          <form onSubmit={handleSubmit} className="bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-3xl w-full h-50">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">Create an account</h1>

            {error && (
              <p className={`text-center mb-4 ${error.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
                {error}
              </p>
            )}

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-900 text-base">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your First Name"
                  required
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-900 text-base">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Last Name"
                />
              </div>
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="bDay" className="block text-sm font-medium text-blue-900 text-base">Date of Birth</label>
                <input
                  type="date"
                  id="bDay"
                  value={formData.bDay}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="gender" className="block text-sm font-medium text-blue-900 text-base">Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="email" className="block text-sm font-medium text-blue-900 text-base">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="phone" className="block text-sm font-medium text-blue-900 text-base">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block text-sm font-medium text-blue-900 text-base">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                  required
                  minLength="6"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-900 text-base">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password"
                  required
                  minLength="6"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="w-64 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create my account'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-blue-900 opacity-80">
                Already have an account?{' '}
                <Link to='/sign-in' className="font-medium text-blue-900 hover:text-blue-600 text-base">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
