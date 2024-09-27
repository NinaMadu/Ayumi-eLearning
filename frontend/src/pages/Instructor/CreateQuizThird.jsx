import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';

const CreateQuizThird = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    pointValue: '',
    passingScore: '',
    intermediateFeedback: '',
    overallFeedback: '',
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
    // Handle the form submission here
  };

  const handleCancel = () => {
    setFormData({
      pointValue: '',
      passingScore: '',
      intermediateFeedback: '',
      overallFeedback: '',
    });
    navigate('/instructor/create-quiz'); // Navigate to the Create Quiz page
  };

  return (
    <AdminLayout>
      <div className="sm:pl-60 md:px-60 lg:px-60 py-4">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-3xl font-semibold">Step 03</h1>
          <button
            className="border p-2 bg-red-600 text-white font-medium rounded-lg"
            onClick={handleCancel}style={{
              background: 'linear-gradient(to right, #DC7676, #C53B3B )',
          }}>
            Cancel Process
          </button>
        </div>

        <div className="my-4 border p-4 pt-0 pl-0 rounded-lg shadow-md">
          <div>
            <h1 className="mb-6 text-xl font-medium border-2 rounded-r-full p-3  bg-orange-200 text-black w-2/12 sm:w-8/12 md:w-2/3 lg:w-1/2">
              Scoring and Publish
            </h1>
          </div>
          <form className="space-y-4 ml-16" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Point Value:</label>
              <input
                type="text"
                id="pointValue"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.pointValue}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Passing Score:</label>
              <input
                type="text"
                id="passingScore"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.passingScore}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Intermediate Feedback:</label>
              <input
                type="text"
                id="intermediateFeedback"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.intermediateFeedback}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Overall Feedback:</label>
              <input
                type="text"
                id="overallFeedback"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.overallFeedback}
              />
            </div>
            <Link to={'/instructor/create-quiz-second'}>
          <div className="fixed bottom-4 left-20 bg-gray-400 text-white p-2 rounded-full shadow-lg z-10">
            <ChevronLeftIcon className="h-6 w-6" />
          </div>
        </Link>
          </form>
        </div>
        <div className="space-y-4 text-center mt-4 flex flex-col items-center">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-1/3"style={{background: 'linear-gradient(to right, #2B3090, #8487BE )'}}>Review Quiz</button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-1/3" style={{background: 'linear-gradient(to right, #2B3090, #8487BE )'}}>Edit Quiz</button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-1/3" style={{background: 'linear-gradient(to right, #2B3090, #8487BE )'}}>Publish Quiz</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateQuizThird;
