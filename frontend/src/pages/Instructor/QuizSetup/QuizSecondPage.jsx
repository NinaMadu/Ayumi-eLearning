import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';

const QuizSecondPage = () => {
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
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="w-full max-w-6xl px-6 bg-white rounded-lg">
          <div className="flex flex-row justify-between w-full mb-4">
            <h1 className="text-3xl font-semibold">Step 02</h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={handleCancel}
              
            >
              Cancel Process
            </button>
          </div>

          <div className="my-4 border p-4 pt-0 rounded-lg shadow-md">
            <h1
              className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
              style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}
            >
              Questions Setup
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap ">Question Type:</label>
                <select
                  id="questionType"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.questionType}
                >
                  <option className='text-sm' value="">Select Type</option>
                  <option value="multipleChoice">Multiple Choice</option>
                  <option value="trueFalse">True/False</option>
                  <option value="shortAnswer">Short Answer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Question Text:</label>
                <input
                  type="text"
                  id="questionText"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.questionText}
                />
              </div>

              {formData.questionType === 'multipleChoice' &&
                formData.answers.map((answer, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                    <label className="col-span-1 whitespace-nowrap text-lg">{`Answer ${index + 1}:`}</label>
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
                    className="bg-blue-900 text-white py-2 px-4 rounded-lg"
                    onClick={addAnswer}
                    style={{ background: 'linear-gradient(to right, #2B3090, #8487BE)' }}
                  >
                    Add Answer
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Correct Answer:</label>
                <input
                  type="text"
                  id="correctAnswer"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.correctAnswer}
                />
              </div>

              <div className="flex ">
                <button
                  type="submit"
                  className="bg-blue-900 text-white py-2 px-6 rounded-lg "
                  
                >
                  Save Question
                </button>
              </div>

            
            </form>
          </div>
          <div className="flex justify-between mt-6">
          <Link to={'/instructor/quiz-first'}>
            <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex pr-4">
              <ChevronLeftIcon className="h-6 w-6" />
              <p>Back</p>
            </div>
          </Link>

          <Link to={'/instructor/quiz-third'}>
            <div className="bg-gray-400 text-white p-2 pl-4 rounded-full shadow-lg flex">
              <p>Next</p>
              <ChevronRightIcon className="h-6 w-6" />
            </div>
          </Link>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizSecondPage;
