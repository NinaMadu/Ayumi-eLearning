import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const CreateCourseFirst = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    prerequisites: '',
    objectives: '',
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
  };

  const handleCancel = (e) => {
    setFormData({
      title: '',
      description: '',
      category: '',
      difficulty: 'beginner',
      prerequisites: '',
      objectives: '',
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center min-h-screen py-8">
        <div className="w-full max-w-6xl p-6 bg-white rounded-lg">
          <div className="flex flex-row justify-between w-full mb-4 ">
            <h1 className="text-3xl font-semibold">Step 01</h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={handleCancel}
            >
              Cancel Process
            </button>
          </div>

          <div className="my-4 border p-4 pt-0 rounded-lg shadow-md">
            <h1 className="mb-6 text-xl font-medium border-2 rounded-lg p-3  text-white justify-center flex"
            style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}>
              Course Information
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Course title:</label>
                <input
                  type="text"
                  id="title"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Course Description:</label>
                <textarea
                  id="description"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Course Category:</label>
                <input
                  type="text"
                  id="category"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.category}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap" htmlFor="difficulty">
                  Difficulty Level:
                </label>
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

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Pre-requisites:</label>
                <input
                  type="text"
                  id="prerequisites"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.prerequisites}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Course Objectives:</label>
                <textarea
                  id="objectives"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.objectives}
                />
              </div>
            </form>
          </div>
          <Link to={'/instructor/create-course-second'}>
            <div className="fixed bottom-4 right-4 bg-gray-400 text-white p-2 rounded-full shadow-lg">
              <ChevronRightIcon className="h-6 w-6" />
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCourseFirst;
