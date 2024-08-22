import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const CreateCourseSecond = () => {
  const [formData, setFormData] = useState({
    custom_duration: '',
    duration: 'hours',
    enroll: 'free',
    custom_price: '',
    price: 'lkr',
    visibility: 'public',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here if needed
  };

  const handleCancel = () => {
    setFormData({
      custom_duration: '',
      duration: 'hours',
      enroll: 'free',
      custom_price: '',
      price: 'lkr',
      visibility: 'public',
    });
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Step 02</h1>
          <button
            className="border p-2 bg-red-600 text-white font-medium rounded-lg"
            onClick={handleCancel}
          >
            Cancel Process
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div>
          <h1 className="mb-6 text-xl font-medium border-2 rounded-lg p-3 bg-red-300 text-black justify-center flex">
              Course Seetings
            </h1>
          </div>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Duration:</label>
              <div className="col-span-3 flex gap-2">
                <input
                  type="text"
                  id="custom_duration"
                  className="p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.custom_duration}
                />
                <select
                  id="duration"
                  className="p-2 border border-slate-200 rounded-lg flex-shrink-0"
                  onChange={handleChange}
                  value={formData.duration}
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center" htmlFor="enroll">
                Enrollment Options:
              </label>
              <select
                id="enroll"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.enroll}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Pricing:</label>
              <div className="col-span-3 flex gap-2">
                <input
                  type="text"
                  id="custom_price"
                  className="p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.custom_price}
                />
                <select
                  id="price"
                  className="p-2 border border-slate-200 rounded-lg flex-shrink-0"
                  onChange={handleChange}
                  value={formData.price}
                >
                  <option value="lkr">LKR</option>
                  <option value="dollar">$</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center" htmlFor="visibility">
                Visibility:
              </label>
              <select
                id="visibility"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.visibility}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </form>
        </div>

        <div className="flex justify-between mt-6">
          <Link to={'/instructor/create-course-first'}>
            <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg">
              <ChevronLeftIcon className="h-6 w-6" />
            </div>
          </Link>

          <Link to={'/instructor/create-course-third'}>
            <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg">
              <ChevronRightIcon className="h-6 w-6" />
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCourseSecond;
