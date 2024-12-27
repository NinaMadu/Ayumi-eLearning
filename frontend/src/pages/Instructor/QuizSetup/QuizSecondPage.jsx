import React, { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  resetQuizData,
} from "../../../redux/quizSlice";
import AdminLayout from "../../../components/AdminLayout";

const QuizSecondPage = () => {
  const [formData, setFormData] = useState({
    questionType: "",
    questionText: "",
    answers: [],
    correctAnswer: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz.questions || []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSaveQuestion = () => {
    if (!formData.questionText.trim() || !formData.questionType.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.questionType === "multipleChoice" && formData.answers.length === 0) {
      alert("Please add at least one answer for multiple-choice questions.");
      return;
    }

    if (isEditing) {
      dispatch(updateQuestion({ index: editIndex, question: formData }));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      dispatch(addQuestion(formData));
    }

    setFormData({
      questionType: "",
      questionText: "",
      answers: [],
      correctAnswer: "",
    });
  };

  const handleEditQuestion = (index) => {
    setFormData(questions[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    dispatch(deleteQuestion(index));
  };

  const handleCancel = () => {
    dispatch(resetQuizData());
    navigate("/instructor/create-quiz");
  };

  const addAnswer = () => {
    setFormData({
      ...formData,
      answers: [...formData.answers, ""],
    });
  };

  const handleAnswerChange = (index, e) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = e.target.value;
    setFormData({ ...formData, answers: updatedAnswers });
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

          {/* Question Form */}
          <div className="my-4 border p-4 pt-0 rounded-lg shadow-md">
            <h1
              className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
              style={{ background: "linear-gradient(to right, #D16262, #C53B3B)" }}
            >
              Questions Setup
            </h1>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
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

              {formData.questionType === "multipleChoice" &&
                formData.answers.map((answer, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                    <label className="col-span-1 whitespace-nowrap">{`Answer ${index + 1}:`}</label>
                    <input
                      type="text"
                      className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                      value={answer}
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
                  <label className="col-span-1 whitespace-nowrap">Answer:</label>
                  <select
                    id="correctAnswer"
                    className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                    onChange={handleChange}
                    value={formData.correctAnswer}
                  >
                    <option value="">Select Answer</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-900  font-semibold text-white py-2 px-6 rounded-lg"
                  onClick={handleSaveQuestion}
                >
                  {isEditing ? "Update Question" : "Save Question"}
                </button>
              </div>
            </form>
          </div>

          {/* Saved Questions */}
          <div className="my-6">
            <h2 className="text-xl font-semibold mb-4">Saved Questions</h2>
            {questions.length === 0 ? (
              <p>No questions have been saved yet.</p>
            ) : (
              questions.map((question, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{`Question ${index + 1}: ${question.questionText}`}</h3>
                    <p>{`Type: ${question.questionType}`}</p>
                    {question.answers.length > 0 && (
                      <ul className="list-disc pl-5">
                        {question.answers.map((answer, i) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ul>
                    )}
                    <p>{`Correct Answer: ${question.correctAnswer}`}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-700"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-700"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Link to={"/instructor/quiz-first"}>
              <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex pr-4">
                <ChevronLeftIcon className="h-6 w-6" />
                <p>Back</p>
              </div>
            </Link>

            <Link to={"/instructor/quiz-third"}>
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
