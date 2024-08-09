import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useNavigate,Link } from 'react-router-dom';

const CreateCourseThird = () => {
  return (
    <div className="sm:pl-60 md:px-60 lg:px-60 py-4">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-3xl font-semibold">Step 03</h1>
        <button className="border p-2 bg-red-600 text-white font-medium rounded-lg">Cancel Process</button>
      </div>

      <div className="my-4 border p-4 pt-0 pl-0 rounded-lg shadow-md">
        <div>
          <h1 className="mb-6 text-xl font-medium border-2 rounded-r-full p-3 bg-custom-orange text-white w-2/12 sm:w-8/12 md:w-2/3 lg:w-1/2">
            Course Settings
          </h1>
        </div>
        <form className="space-y-4 ml-16">
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course Duration:</label>
            <div className="col-span-3 flex gap-2">
              <input
                type="text"
                id="custom-duration"
                className="p-2 border border-slate-200 rounded-lg w-full"
              />
              <select
                id="duration"
                className="p-2 border border-slate-200 rounded-lg flex-shrink-0"
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap" htmlFor="difficulty">Enrollment Options:</label>
            <select id="enroll" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full">
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Pricing:</label>
            <div className="col-span-3 flex gap-2">
              <input
                type="text"
                id="custom-payment"
                className="p-2 border border-slate-200 rounded-lg w-full"
              />
              <select
                id="price"
                className="p-2 border border-slate-200 rounded-lg flex-shrink-0"
              >
                <option value="hours">LKR</option>
                <option value="days">$</option>
              </select>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap" htmlFor="difficulty">Enrollment Options:</label>
            <select id="visibility" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

         
        </form>
      </div>
      <div className='flex flex-row'>
        <Link to={'/create-course-second'}>
          <div className="fixed bottom-3 left-60 bg-gray-400 text-white p-2 rounded-full shadow-lg">
            <ChevronLeftIcon className="h-6 w-6" />
          </div>
        </Link>
        
        <Link to={'/create-course-four'}>
          <div className="fixed bottom-3 right-4 bg-gray-400 text-white p-2 rounded-full shadow-lg">
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CreateCourseThird;
