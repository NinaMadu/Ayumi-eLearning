import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';

const QuizThirdPage = () => {
  const navigate = useNavigate(); 
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
    // Handle form submission logic here
  };

  const handleCancel = () => {
    setFormData({
      pointValue: '',
      passingScore: '',
      intermediateFeedback: '',
      overallFeedback: '',
    });
    navigate('/instructor/create-quiz');
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">

        <div className="flex flex-row justify-between w-full mb-4">
            <h1 className="text-3xl font-semibold">Step 03</h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={handleCancel}
            >
              Cancel Process
            </button>
          </div>

        {/* Form Section */}
        <div className="my-4 border p-4 pt-0 rounded-lg shadow-md">
          <div>
          <h1
              className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
              style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}
            >
              Scoring and Publish
            </h1>
          </div>
          <form className="space-y-4 ml-8" onSubmit={handleSubmit}>
            {/* Point Value */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <label className="col-span-1">Point Value:</label>
              <input
                type="text"
                id="pointValue"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.pointValue}
              />
            </div>

            {/* Passing Score */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <label className="col-span-1">Passing Score:</label>
              <input
                type="text"
                id="passingScore"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.passingScore}
              />
            </div>

            {/* Intermediate Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <label className="col-span-1">Intermediate Feedback:</label>
              <input
                type="text"
                id="intermediateFeedback"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.intermediateFeedback}
              />
            </div>

            {/* Overall Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
              <label className="col-span-1">Overall Feedback:</label>
              <input
                type="text"
                id="overallFeedback"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.overallFeedback}
              />
            </div>
          </form>

         
        </div>

      
        <div className="space-y text-center mt-4 flex gap-4 items-center">
          <button
            className="text-white font-semibold py-2 px-4 rounded-lg w-1/3 bg-blue-900"
            
          >
            Review Quiz
          </button>
          <button
            className="text-white font-semibold py-2 px-4 rounded-lg w-1/3 bg-blue-900"
            
          >
            Edit Quiz
          </button>
          <button
            className="text-white font-semibold bg-blue-900 py-2 px-4 rounded-lg w-1/3"
            
          >
            Publish Quiz
          </button>
        </div>
        <div className="flex justify-between mt-6">
          <Link to={'/instructor/quiz-second'}>
  
            <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex pr-4">
              <ChevronLeftIcon className="h-6 w-6" />
              <p>Back</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizThirdPage;
