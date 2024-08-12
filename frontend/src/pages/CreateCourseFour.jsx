import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useNavigate,Link } from 'react-router-dom';


const [formData, setFormData]= useState({
  links:'',

})

const handleChange = (e)=>{
  const {id} = e.target;
  setFormData ({
    ...formData,
    [id]:value,
  });
};

const handleSubmit = (e)=>{
  e.preventDefault();
}

const handleCancel = (e)=>{
  setFormData({
    links:'',
  })
}


const CreateCourseFour = () => {
  return (
    <div className="sm:pl-60 md:px-60 lg:px-60 py-4">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-3xl font-semibold">Step 04</h1>
        <button className="border p-2 bg-red-600 text-white font-medium rounded-lg" onClick={handleCancel}>Cancel Process</button>
      </div>

      <div className="my-4 border p-4 pt-0 pl-0 rounded-lg shadow-md">
        <div>
          <h1 className="mb-6 text-xl font-medium border-2 rounded-r-full p-3 bg-custom-orange text-white w-2/12 sm:w-8/12 md:w-2/3 lg:w-1/2">
            Media and Resources
          </h1>
        </div>
        <form className="space-y-4 ml-16" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course Introduction Image:</label>
            <input type="text" id="image" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course Introduction Video:</label>
            <input type="text" id="video" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" />
          </div>

        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course Materials:</label>
            <div className="col-span-3 flex gap-2">
              <button className="p-2 border border-slate-200 rounded-lg w-full bg-green-700 hover:opacity-85 text-white font-semibold md:w-2/4">Upload</button>
            </div>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Embed Media:</label>
            <div className="col-span-3 flex gap-2">
              <button className="p-2 border border-slate-200 rounded-lg w-full bg-green-700 hover:opacity-85 text-white font-semibold md:w-2/4">Upload</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Links to External Resources:</label>
            <input type="text" id="links" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" onChange={handleChange} value={formData.links}/>
          </div>

        </form>

        <div className='flex justify-center mt-8'>
            <button className="p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold w-1/2 sm:w-1/3 md:w-2/4">
                Create Course
            </button>
        </div>


      </div>
      <Link to={'/create-course-second'}>
          <div className="fixed bottom-3 left-60 bg-gray-400 text-white p-2 rounded-full shadow-lg">
            <ChevronLeftIcon className="h-6 w-6" />
          </div>
        </Link>
      
    </div>
  );
};

export default CreateCourseFour;
