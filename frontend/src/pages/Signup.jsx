import React from 'react'
import { Link } from 'react-router-dom'
//import Header from '../components/Header'

export default function Signup() {
  return (
    <>
    {/*<Header/>*/}
    <div className="flex items-center justify-front min-h-screen bg-cover bg-center bg-no-repeat bg-opacity-90" style={{ backgroundImage: "url('/src/assets/bg1.jpg')",opacity:0.9 }} >
      <div  class="bg-white bg-opacity-50 p-10 rounded-lg shadow-lg max-w-3xl w-full h-full ml-20 mt-20" >

      <form action='' class="bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-3xl w-full h-50">
      <div>
        <h1 class="text-4xl font-bold text-center mb-6 text-blue-900">Create an account</h1>
        <div class="mb-4 flex space-x-4">
        <div class="w-1/2" >
          <label htmlFor="firstName" class="block text-sm font-medium text-blue-900 text-base" for="test">First Name</label>
          <input type="text" id="first name" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your First Name"/>
        </div>
        <div class="w-1/2">
          <label htmlFor="lastName" class="block text-sm font-medium text-blue-900 text-base" for="test">Last Name</label>
          <input type="test" id="lastName" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your Last Name"/>
        </div>
        </div>
        <div class="mb-4 flex space-x-4">
        <div class="w-1/2" >
          <label htmlFor="Date of Birth" class="block text-sm font-medium text-blue-900 text-base" for="test">Date of Birth </label>
          <input type="date" id="dob" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your First Name"/>
        </div>
        <div class="w-1/2">
          <label htmlFor="gender" class="block text-sm font-medium text-blue-900 text-base" for="test">Gender</label>
          <select id="gender"name="gender" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="male">Male</option>
                <option value="female">Female</option>
          </select>
        </div>
        </div>
        <div class="mb-4 flex space-x-4">
        <div class="w-1/2" >
          <label htmlFor="email" class="block text-sm font-medium text-blue-900 text-base" for="test">Email</label>
          <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your Email"/>
        </div>
        <div class="w-1/2">
          <label htmlFor="phoneNo" class="block text-sm font-medium text-blue-900 text-base" for="test">Phone Number</label>
          <input type="tel" id="phone" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your phone number"/>
        </div>
        </div>
        <div class="mb-4 flex space-x-4">
        <div class="w-1/2" >
          <label htmlFor="password" class="block text-sm font-medium text-blue-900 text-base" for="test">Password</label>
          <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your password"/>
        </div>
        <div class="w-1/2">
          <label htmlFor="confirmPassword" class="block text-sm font-medium text-blue-900 text-base" for="test">Confirm Password</label>
          <input type="password" id="confirmPassword" class="mt-1 block w-full px-3 py-2 border border-blue-900 border-opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your Confirm password"/>
        </div>
        </div>
      </div>
      
      <div class="flex justify-center">
             <button type="submit" class="w-64 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  text-lg">
              Create my account
            </button>
      </div>
      <div class="mt-6 text-center">
        <span  class="text-sm text-blue-900 opacity-80">Already have an account?  <Link to='/Sign-in' class="font-medium text-blue-900 hover:text-blue-600 text-base">Login</Link></span>
      </div>
      </form>
      </div>     
    </div>
    </>
  )
}
