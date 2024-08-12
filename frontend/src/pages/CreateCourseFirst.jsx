import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useNavigate,Link } from 'react-router-dom';


const CreateCourseFirst = () => {

  const [formData, setFormData] = useState({
    title:'',
    description:'',
    category:'',
    difficulty:'beginner',
    prerequisites:'',
    objectives:'',
   
  }
  )

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

  const handleCancel= (e)=> {
    setFormData({
      title:'',
      description:'',
      category:'',
      difficulty:'beginner',
      prerequisites:'',
      objectives:'',
    })
  }

  return (
    <div className="sm:pl-60 md:px-60 lg:px-60 py-4">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-3xl font-semibold">Step 01</h1>
        <button className="border p-2 bg-red-600 text-white font-medium rounded-lg" onClick={handleCancel}>Cancel Process</button>
      </div>

      <div className="my-4 border p-4 pt-0 pl-0 rounded-lg shadow-md">
        <div>
          <h1 className="mb-6 text-xl font-medium border-2 rounded-r-full p-3 bg-custom-orange text-white w-2/12 sm:w-8/12 md:w-2/3 lg:w-1/2">
            Course Information
          </h1>
        </div>
        <form className="space-y-4 ml-16" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course title:</label>
            <input type="text" id="title" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" onChange={handleChange} value={formData.title} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course Description:</label>
            <textarea id="description" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" onChange={handleChange} value={formData.description}  />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course Category:</label>
            <input type="text" id="category" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" onChange={handleChange} value={formData.category}  />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap" htmlFor="difficulty">Difficulty Level:</label>
            <select id="difficulty" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" onChange={handleChange} value={formData.difficulty}>
              <option value="beginner" >Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Pre-requisites:</label>
            <input type="text" id="prerequisites" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" onChange={handleChange} value={formData.prerequisites} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <label className="col-span-1 whitespace-nowrap">Course Objectives:</label>
            <textarea id="objectives" className="col-span-3 p-2 border border-slate-200 rounded-lg w-full" onChange={handleChange} value={formData.objectives} />
          </div>
        </form>
      </div>
      <Link to={'/create-course-second'}>
      <div className="fixed bottom-4 right-4 bg-gray-400 text-white p-2 rounded-full shadow-lg">
        
        <ChevronRightIcon  className="h-6 w-6" />
      </div>
    </Link>
    </div>
  );
};

export default CreateCourseFirst;
