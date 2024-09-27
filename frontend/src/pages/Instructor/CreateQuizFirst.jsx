import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const CreateQuizFirst = () => {
  const [formData, setFormData] = useState({
    quizTitle: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    questions: [],
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = [...formData.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: '', answer: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleCancel = () => {
    setFormData({
      quizTitle: '',
      description: '',
      category: '',
      difficulty: 'beginner',
      questions: [],
    });
    navigate('/instructor/create-quiz'); // Use navigate to redirect
  };

  return (
    <AdminLayout>
      <div className="sm:pl-60 md:px-60 lg:px-60 py-4">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-3xl font-semibold">Step 01</h1>
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
            <h1 className="mb-6 text-xl font-medium border-2 rounded-r-full p-3 bg-orange-200 text-black w-2/12 sm:w-8/12 md:w-2/3 lg:w-1/2" style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}>
              Quiz Information
            </h1>
          </div>
          <form className="space-y-4 ml-16" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Quiz Title:</label>
              <input
                type="text"
                id="quizTitle"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.quizTitle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Description:</label>
              <textarea
                id="description"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.description}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Category:</label>
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

            {formData.questions.map((question, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">Question {index + 1}:</label>
                <input
                  type="text"
                  name="question"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
                <label className="col-span-1 whitespace-nowrap">Answer:</label>
                <input
                  type="text"
                  name="answer"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
              </div>
            ))}
          </form>
        </div>

        <Link to="/instructor/create-quiz-second">
          <div className="fixed bottom-4 right-4 bg-gray-400 text-white p-2 rounded-full shadow-lg">
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default CreateQuizFirst;
