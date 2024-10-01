import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const CreateCourseThird = () => {
  const [formData, setFormData] = useState({
    image: '',
    video: '',
    links: '',
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
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData({
      image: '',
      video: '',
      links: '',
    });
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Step 03</h1>
          <button
            className="border p-2 bg-red-600 text-white font-medium rounded-lg"
            onClick={handleCancel}
          >
            Cancel Process
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div>
            <h1 className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
            style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}>
              Media and Resources
            </h1>
          </div>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Introduction Image:</label>
              <input
                type="file"
                id="images"
                accept=".jpg,.jpeg,.png" 
                multiple
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
             
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Introduction Video:</label>
              <input
                type="file"
                id="videos"
                accept=".mp3" 
                multiple
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
             
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Links to External Resources:</label>
              <input
                type="text"
                id="links"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.links}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Upload Course Materials:</label>
              <input
                type="file"
                id="imagesandpdfs"
                accept=".jpg,.jpeg,.png,.gif,.pdf" 
                multiple
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
             
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Embed Media:</label>
              <Link to={'/instructor/add-videos'}>
                <button
                  type="button"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg bg-slate-400 hover:opacity-85 text-white font-semibold"
                >
                  Upload
                </button>
              </Link>
            </div>
          </form>
        </div>
          <button
                type="button"
                className="flex mt-8 justify-center w-full  p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold"
              >
                Create Course
              </button>

        <div className="flex justify-between mt-6">
          <Link to={'/instructor/create-course-second'}>
            <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg">
              <div className='flex '>
              <ChevronLeftIcon className="h-6 w-6" />
              <p className='pr-2'>
                Back
              </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCourseThird;
