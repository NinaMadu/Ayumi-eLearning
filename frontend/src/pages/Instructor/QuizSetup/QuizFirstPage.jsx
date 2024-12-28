// src/pages/instructor/quizFirstPage/QuizFirstPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuizData, resetQuizData } from '../../../redux/quizSlice';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';

const QuizFirstPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.quiz.quizData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateQuizData({ [id]: value }));
  };

  const handleCancel = () => {
    dispatch(resetQuizData());
    navigate('/instructor/create-quiz');
  };
  //dispatch(updateQuizData({ [id]: value }));


  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="w-full max-w-6xl px-6 bg-white rounded-lg">
          <div className="flex flex-row justify-between w-full mb-4">
            <h1 className="text-3xl font-semibold">Step 01</h1>
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
              Quiz Information
            </h1>
            <form className="space-y-4">
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
                <label className="col-span-1 whitespace-nowrap" htmlFor="category">
                  Category:
                </label>
                <select
                  id="category"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.category}
                >
                  <option value="">Select Type</option>
                  <option value="Language Skills">Language Skills</option>
                  <option value="Cultural Knowledge">Cultural Knowledge</option>
                  <option value="Proficiency Levels">Proficiency Levels</option>
                  <option value="Fun and Interactive">Fun and Interactive</option>
                  <option value="History and Literature">History and Literature</option>
                  <option value="Practical Use">Practical Use</option>
                </select>
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
                  <option value="">Select Type</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </form>
          </div>

          <div className="flex justify-between mt-6">
            <Link to={'/instructor/quiz-second'}>
              <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex pl-4">
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

export default QuizFirstPage;
