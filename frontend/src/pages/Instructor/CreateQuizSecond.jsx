import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const CreateQuizSecond = () => {
  const [formData, setFormData] = useState({
    questionType: '',
    questionText: '',
    answers: [],
    correctAnswer: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleAnswerChange = (index, e) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = e.target.value;
    setFormData({
      ...formData,
      answers: newAnswers,
    });
  };

  const addAnswer = () => {
    setFormData({
      ...formData,
      answers: [...formData.answers, ''],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Question added:', formData);
  };

  const handleCancel = () => {
    setFormData({
      questionType: '',
      questionText: '',
      answers: [],
      correctAnswer: '',
    });
    navigate('/instructor/create-quiz'); 
  };

  return (
    <AdminLayout>
      <div className="sm:pl-60 md:px-60 lg:px-60 py-4">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-3xl font-semibold">Step 02</h1>
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
            <h1 className="mb-6 text-xl font-medium border-2 rounded-r-full p-3 bg-orange-200 text-black w-2/12 sm:w-8/12 md:w-2/3 lg:w-1/2">
              Questions Setup
            </h1>
          </div>
          <form className="space-y-4 ml-16" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Question Type:</label>
              <select
                id="questionType"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.questionType}
              >
                <option value="">Select Type</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="trueFalse">True/False</option>
                <option value="shortAnswer">Short Answer</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Question Text:</label>
              <input
                type="text"
                id="questionText"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.questionText}
              />
            </div>

            {formData.questionType === 'multipleChoice' && formData.answers.map((answer, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">{`Answer ${index + 1}`}</label>
                <input
                  type="text"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e)}
                />
              </div>
            ))}

            {formData.questionType === 'multipleChoice' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded-lg"
                  onClick={addAnswer} style={{background: 'linear-gradient(to right, #2B3090, #8487BE )'}}>
                  Add Answer
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Correct Answer:</label>
              <input
                type="text"
                id="correctAnswer"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.correctAnswer}
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg" style={{background: 'linear-gradient(to right, #2B3090, #8487BE )'}}>
                Save Question
              </button>
            </div>


            <Link to={'/instructor/create-quiz-first'}>
          <div className="fixed bottom-4 left-20 bg-gray-400 text-white p-2 rounded-full shadow-lg z-10">
            <ChevronLeftIcon className="h-6 w-6" />
          </div>
        </Link>

    
        <Link to={'/instructor/create-quiz-third'}>
          <div className="fixed bottom-4 right-4 bg-gray-400 text-white p-2 rounded-full shadow-lg z-10 ml-10">
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </Link>
          </form>
          
        </div>

       
        
      </div>
    </AdminLayout>
  );
};

export default CreateQuizSecond;
