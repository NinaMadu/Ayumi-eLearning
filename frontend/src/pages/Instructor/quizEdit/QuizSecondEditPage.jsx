import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuizData, updateQuizData } from '../../../redux/quizSlice';
import axios from 'axios';
import useCancelConfirmation from "../../../hooks/useCancelConfirmation";

const QuizSecondEditPage = () => {
  const { triggerCancel, confirmationBox } = useCancelConfirmation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizId } = useParams();

  const { state } = useLocation();
  const formData = useSelector((state) => state.quiz); // Access quiz data from Redux store

  useEffect(() => {
    if (state) {
      dispatch(resetQuizData(state)); // Pre-fill with passed data
    } else if (formData._id) {
      const fetchQuizData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/quiz/${formData._id}`);
          dispatch(updateQuizData(response.data.quiz)); // Dispatch to store if the quizId exists
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        }
      };
      fetchQuizData();
    }
  }, [state, formData._id, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(resetQuizData({ ...formData, [id]: value })); // Update formData in Redux
  };

  const handleAnswerChange = (index, e) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = e.target.value;
    dispatch(resetQuizData({ ...formData, answers: updatedAnswers }));
  };

  const addAnswer = () => {
    const updatedAnswers = [...formData.answers, ''];
    dispatch(resetQuizData({ ...formData, answers: updatedAnswers }));
  };

  const handleSaveQuestion = () => {
    if (formData._id) {
      // Update existing question (replace with your API call to save changes)
      axios.put(`http://localhost:5000/api/quiz/${formData._id}`, formData)
        .then(response => {
          alert('Question updated successfully!');
          navigate(`/instructor/edit-quiz-third/${quizId}`, { state: formData });
        })
        .catch(err => console.error('Error updating question:', err));
    } else {
      // Save new question (replace with your API call to save the question)
      axios.post('http://localhost:5000/api/quiz', formData)
        .then(response => {
          alert('Question saved successfully!');
          navigate(`/instructor/edit-quiz-third/${quizId}`, { state: formData });
        })
        .catch(err => console.error('Error saving question:', err));
    }
  };

  const handleNext = () => {
    console.log(formData);
    navigate(`/instructor/edit-quiz-third/${quizId}`, { state: formData });
  };

  const handleBack = () => {
    console.log(formData);
    navigate(`/instructor/edit-quiz-first/${quizId}`, { state: formData });
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="w-full max-w-6xl px-6 bg-white rounded-lg">
          <div className="flex flex-row justify-between w-full mb-4">
            <h1 className="text-3xl font-semibold">Step 02</h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={triggerCancel}
            >
              Cancel Process
            </button>
          </div>

          {/* Question Form */}
          <div className="my-4 border p-4 pt-0 rounded-lg shadow-md">
            <h1
              className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
              style={{
                background: "linear-gradient(to right, #D16262, #C53B3B)"
              }}
            >
              Questions Setup
            </h1>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">
                  Question Type:
                </label>
                <select
                  id="questionType"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.questionType || ''}
                >
                  <option value="">Select Type</option>
                  <option value="multipleChoice">Multiple Choice</option>
                  <option value="trueFalse">True/False</option>
                  <option value="shortAnswer">Short Answer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                <label className="col-span-1 whitespace-nowrap">
                  Question Text:
                </label>
                <input
                  type="text"
                  id="questionText"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.questionText || ''}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                <label className="col-span-1">Marks:</label>
                <input
                  type="number"
                  id="marks"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                  onChange={handleChange}
                  value={formData.marks || ''}
                />
              </div>

              {formData.questionType === "multipleChoice" &&
                formData.answers?.map((answer, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4"
                  >
                    <label className="col-span-1 whitespace-nowrap">{`Answer ${index + 1}:`}</label>
                    <input
                      type="text"
                      className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                      value={answer || ''}
                      onChange={(e) => handleAnswerChange(index, e)}
                    />
                  </div>
                ))}

              {formData.questionType === "multipleChoice" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={addAnswer}
                  >
                    Add Answer
                  </button>
                </div>
              )}

              {formData.questionType === "trueFalse" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                  <label className="col-span-1 whitespace-nowrap">
                    Answer:
                  </label>
                  <select
                    id="correctAnswer"
                    className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                    onChange={handleChange}
                    value={formData.correctAnswer || ''}
                  >
                    <option value="">Select Answer</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
              )}

              {formData.questionType === "multipleChoice" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                  <label className="col-span-1 whitespace-nowrap">
                    Correct Answer:
                  </label>
                  <select
                    id="correctAnswer"
                    className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                    onChange={handleChange}
                    value={formData.correctAnswer || ''}
                  >
                    <option value="">Select Correct Answer</option>
                    {formData.answers?.map((answer, index) => (
                      <option key={index} value={answer}>
                        {answer}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.questionType === "shortAnswer" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                  <label className="col-span-1 whitespace-nowrap">
                    Correct Answer:
                  </label>
                  <input
                    type="text"
                    id="correctAnswer"
                    className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                    onChange={handleChange}
                    value={formData.correctAnswer || ''}
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-800 font-semibold text-white py-2 px-6 rounded-lg"
                  onClick={handleSaveQuestion}
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button onClick={handleBack} className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex pr-4">
              <ChevronLeftIcon className="h-6 w-6" />
              <p>Back</p>
            </button>

            <button onClick={handleNext} className="bg-gray-400 text-white p-2 pl-4 rounded-full shadow-lg flex">
              <p>Next</p>
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizSecondEditPage;
