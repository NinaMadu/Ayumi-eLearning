import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData, resetCourseData } from '../../redux/courseSlice';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const CreateCourseFirst = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.course);

  useEffect(() => {

  }, []);

  const handleNext = () => {
    console.log(formData);
    dispatch(setCourseData(formData));
    navigate('/instructor/create-course-second');
  };


  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setCourseData({ [id]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    dispatch(resetCourseData());
  };

  return (
    <AdminLayout>
      {/* Adjusted padding to match CreateCourseThird */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Step 01</h1>
          <button
            className="border p-2 bg-red-600 text-white font-medium rounded-lg"
            onClick={handleCancel}
          >
            Cancel Process
          </button>
        </div>

       
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1
            className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
            style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}
          >
            Course Information
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Title:</label>
              <input
                type="text"
                id="title"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Description:</label>
              <textarea
                id="description"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.description}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Category:</label>
              <input
                type="text"
                id="category"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.category}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Difficulty Level:</label>
              <select
                id="difficulty"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.difficulty}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Pre-requisites:</label>
              <input
                type="text"
                id="prerequisites"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.prerequisites}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Objectives:</label>
              <textarea
                id="objectives"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.objectives}
              />
            </div>
          </form>
        </div>

        <div className="flex justify-end mt-6 right-4">
  <button onClick={handleNext}>
    <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg">
      <div className='flex items-center pl-2'>
        <p className="mr-2">Next</p>
        <ChevronRightIcon className="h-6 w-6" />
      </div>
    </div>
  </button>
</div>

      </div>
    </AdminLayout>
  );
};

export default CreateCourseFirst;
