import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import {
  FaCalendarTimes,
  FaClock,
  FaLevelUpAlt,
  FaListAlt,
  FaTimesCircle,
} from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuizContent = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false); // Add this state

  useEffect(() => {
    if (!quizId) {
      setError("Quiz ID is missing in the URL");
      setLoading(false);
      return;
    }

    const fetchQuizData = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/quiz/${quizId}`);
        setQuiz(data.quiz);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleStartQuiz = () => {
    setQuizStarted(true); // Set quizStarted to true when the user clicks Start
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score += question.marks; // Add marks for the correct answer
      }
    });

    setTotalMarks(score);
    setQuizSubmitted(true);
  };

  return (
    <div>
      <Header />
      <div className="max-w-8xl mx-auto pt-16 mb-8">
        {loading && <p className="pt-12">Loading...</p>}
        {error && (
          <p className="pt-12" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {quiz && (
          <div className="bg-slate-50 rounded-lg p-8 ">
            {/* Quiz Header */}
            {!quizStarted && ( // Check if the quiz has started
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8 mt-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                  {quiz.quizTitle}
                </h1>
                <p className="text-md text-gray-600 mt-4">{quiz.description}</p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaListAlt className="text-blue-600" />
                    <span className="text-lg font-medium">{quiz.category}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaLevelUpAlt className="text-blue-600" />
                    <span className="text-lg font-medium">
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaClock className="text-blue-600" />
                    <span className="text-lg font-medium">
                      {quiz.duration} minutes
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleStartQuiz}
                  className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg rounded-md shadow-lg transform hover:scale-105 hover:from-blue-500 hover:to-blue-700 transition-all duration-200"
                >
                  Start Quiz
                </button>
              </div>
            )}

            {/* Quiz Content */}
            {quizStarted && !quizSubmitted ? (
              <>
                {/* Current Question */}
                <div className="space-y-10 p-4 bg-white rounded-md shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Question {currentQuestionIndex + 1}:
                  </h2>
                  <p className="text-lg text-gray-700">
                    {quiz.questions[currentQuestionIndex].questionText}
                  </p>

                  {/* Render question types */}
                  {quiz.questions[currentQuestionIndex].questionType ===
                    "multipleChoice" && (
                    <ul className="space-y-4">
                      {quiz.questions[currentQuestionIndex].answers.map(
                        (answer, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={`question-${currentQuestionIndex}`}
                              id={`question-${currentQuestionIndex}-answer-${idx}`}
                              onChange={() => handleAnswerChange(answer)}
                              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`question-${currentQuestionIndex}-answer-${idx}`}
                              className="text-gray-800 hover:text-blue-600 cursor-pointer"
                            >
                              {answer}
                            </label>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                  {quiz.questions[currentQuestionIndex].questionType ===
                    "trueFalse" && (
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          id={`question-${currentQuestionIndex}-true`}
                          onChange={() => handleAnswerChange("True")}
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`question-${currentQuestionIndex}-true`}
                          className="text-gray-800 hover:text-blue-600 cursor-pointer"
                        >
                          True
                        </label>
                      </li>
                      <li className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          id={`question-${currentQuestionIndex}-false`}
                          onChange={() => handleAnswerChange("False")}
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`question-${currentQuestionIndex}-false`}
                          className="text-gray-800 hover:text-blue-600 cursor-pointer"
                        >
                          False
                        </label>
                      </li>
                    </ul>
                  )}
                  {quiz.questions[currentQuestionIndex].questionType ===
                    "shortAnswer" && (
                    <textarea
                      name={`question-${currentQuestionIndex}`}
                      className="w-full border rounded-md p-4 focus:outline-none focus:ring-1 focus:ring-blue-950 placeholder-gray-400"
                      placeholder="Write your answer here..."
                      rows="4"
                      onChange={(e) => handleAnswerChange(e.target.value)}
                    ></textarea>
                  )}

                  <div className="text-sm text-gray-600 mt-4 flex justify-between items-center">
                    <span>
                      <strong>Marks:</strong>{" "}
                      {quiz.questions[currentQuestionIndex].marks}
                    </span>
                    <span className="text-blue-700 italic">
                      Question Type:{" "}
                      {quiz.questions[currentQuestionIndex].questionType}
                    </span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded ${
                      currentQuestionIndex === 0
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gray-500 text-white font-semibold hover:bg-gray-400"
                    }`}
                  >
                    Previous
                  </button>

                  {currentQuestionIndex === quiz.questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-600"
                    >
                      Save and Submit
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded bg-blue-800 text-white font-semibold hover:bg-blue-600"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            ) : (
              quizSubmitted && (
                <div
                  className={`text-center p-10 rounded-lg ${
                    totalMarks >= quiz.passingScore
                      ? "bg-green-50 border-green-400 border-2"
                      : "bg-red-100 border-red-200 border-2"
                  }`}
                >
                  {/* Conditional Congratulatory Message */}
                  <h2
                    className={`text-3xl font-bold ${
                      totalMarks >= quiz.passingScore
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {totalMarks >= quiz.passingScore
                      ? "Congratulations!!!"
                      : "Better Luck Next Time!"}
                  </h2>

                  <div className="flex justify-center items-center mt-4">
                    <div
                      className={`p-4 rounded-full shadow-xl ${
                        totalMarks >= quiz.passingScore
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9 3-3-9-9-3-3 9 3 9z"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-xl text-gray-800 mt-6">
                    You scored <strong>{totalMarks}</strong> marks out of{" "}
                    {quiz.questions.reduce(
                      (acc, question) => acc + question.marks,
                      0
                    )}
                    .
                  </p>
                  <table className="min-w-full table-auto border-collapse mt-6 rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-blue-200 text-slate-800">
                <tr>
                  <th className="px-6 py-4 border-b">Question</th>
                  <th className="px-6 py-4 border-b">Your Answer</th>
                  <th className="px-6 py-4 border-b">Correct Answer</th>
                  <th className="px-6 py-4 border-b">Marks</th>
                </tr>
              </thead>
              <tbody>
                {quiz.questions.map((question, index) => {
                  const isCorrect =
                    userAnswers[index] === question.correctAnswer;
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-6 py-4 border-b text-gray-800">
                        {index + 1}
                      </td>
                      <td
                        className={`px-6 py-4 border-b ${
                          isCorrect
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }`}
                      >
                        {userAnswers[index] || "Not Answered"}
                      </td>
                      <td className="px-6 py-4 border-b text-gray-800">
                        {question.correctAnswer}
                      </td>
                      <td
                        className={`px-6 py-4 border-b ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isCorrect ? question.marks : 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Motivational message */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold">
                {totalMarks >= quiz.passingScore
                  ? "Congratulations! You passed the quiz! 🎉"
                  : "Good effort! Don't give up, try again next time! 💪"}
              </h2>
              <p className="text-lg mt-2">
                {totalMarks >= quiz.passingScore
                  ? `You scored ${totalMarks} out of ${
                      quiz.questions.length * 2
                    } marks. Great job!`
                  : `You scored ${totalMarks} out of ${
                      quiz.questions.length * 2
                    } marks. Keep practicing, you'll get there!`}
              </p>
            </div>

                </div>
              )
            )}
            
          </div>
        )}
            
      </div>
    </div>
  );
};

export default QuizContent;
