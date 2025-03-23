import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import {
  FaCalendarTimes,
  FaClock,
  FaLevelUpAlt,
  FaListAlt,
} from "react-icons/fa";
import Timer from "../../components/Timer";
import { useSelector } from "react-redux";

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
  const [quizStarted, setQuizStarted] = useState(false);
  const [viewResults, setViewResults] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [quizDuration, setQuizDuration] = useState(0);
  const [timeUpMessage, setTimeUpMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  const userId = currentUser._id;
  
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
        setQuizDuration(data.quiz.duration * 60); // Set duration in seconds
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
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

  const handleSubmit = async () => {
    // Calculate score FIRST
    const calculatedScore = quiz.questions.reduce((acc, question, index) => {
      return userAnswers[index] === question.correctAnswer 
        ? acc + question.marks 
        : acc;
    }, 0);
  
    // Update state AFTER calculation
    setTotalMarks(calculatedScore);
    setQuizSubmitted(true);
    setQuizFinished(true);
    setIsSubmitting(true);
  
    // Use calculatedScore directly in submission
    try {
      const response = await fetch(`${API_BASE_URL}/api/quiz-attempts/submit`, { // Add API_BASE_URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}` // Add auth header
        },
        body: JSON.stringify({
          quizId: quiz._id,
          userId: userId, 
          score: calculatedScore // Use freshly calculated value
        }),
      });
  
      // Handle response
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Submission failed");
      console.log("Quiz submitted successfully:", data);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      // Consider adding error state to show to user
    }finally{
      setIsSubmitting(false);
    }
  };
  const handleViewResults = () => {
    setViewResults(true);
  };

  const handleTryAgain = () => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    setViewResults(false);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTotalMarks(0);
    setTimerFinished(false);
    setTimeUpMessage(false);
  };

  const handleTimeUp = () => {
    setQuizFinished(true);
    setTimerFinished(true);
    handleSubmit();
    setTimeUpMessage(true);
  };

  if (loading) {
    return <p className="pt-12">Loading...</p>;
  }

  if (error) {
    return (
      <p className="pt-12" style={{ color: "red" }}>
        {error}
      </p>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="max-w-8xl mx-auto pt-16 mb-8">
        <div className="bg-slate-50 rounded-lg p-8">
          {/* Quiz Header */}
          {!quizStarted && (
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
                  <span className="text-lg font-medium">{quiz.difficulty}</span>
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
          {quizStarted && !quizSubmitted && !timerFinished && (
            <div className="py-4">
              <Timer duration={quizDuration} onTimeUp={handleTimeUp} />
              <div className="flex h-full bg-gray-100 rounded-lg shadow-lg">
                {/* Sidebar - Question Numbers */}
                <div className="w-1/6 bg-gray-300 text-white p-4 rounded-lg ">
                  <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Questions
                  </h2>
                  <div className="flex flex-col gap-3">
                    {quiz.questions.map((_, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 rounded-full text-white font-bold ${
                          index === currentQuestionIndex
                            ? "border-2 border-white"
                            : ""
                        } ${
                          userAnswers[index] ? "bg-green-500" : "bg-gray-500"
                        }`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Content - Questions & Answers */}
                <div className="w-full ml-4 py-8">
                  <div className="bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Question {currentQuestionIndex + 1}:
                    </h2>
                    <p className="text-lg text-gray-700">
                      {quiz.questions[currentQuestionIndex].questionText}
                    </p>

                    {/* Multiple Choice Questions */}
                    {quiz.questions[currentQuestionIndex].questionType ===
                      "multipleChoice" && (
                      <ul className="space-y-4 mt-4">
                        {quiz.questions[currentQuestionIndex].answers.map(
                          (answer, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                id={`question-${currentQuestionIndex}-answer-${idx}`}
                                onChange={() => handleAnswerChange(answer)}
                                checked={
                                  userAnswers[currentQuestionIndex] === answer
                                }
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

                    {/* True/False Questions */}
                    {quiz.questions[currentQuestionIndex].questionType ===
                      "trueFalse" && (
                      <ul className="space-y-4 mt-4">
                        <li className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            id={`question-${currentQuestionIndex}-true`}
                            onChange={() => handleAnswerChange("True")}
                            checked={
                              userAnswers[currentQuestionIndex] === "True"
                            }
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
                            checked={
                              userAnswers[currentQuestionIndex] === "False"
                            }
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

                    {/* Short Answer Question */}
                    {quiz.questions[currentQuestionIndex].questionType ===
                      "shortAnswer" && (
                      <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        value={userAnswers[currentQuestionIndex] || ""}
                        className="w-full p-4 border border-gray-300 rounded-md mt-4"
                      />
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="px-6 py-3 bg-gray-600 hover:bg-slate-500 text-white font-semibold rounded-md "
                    >
                      Previous
                    </button>
                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                      <button
                        onClick={handleSubmit} disabled={isSubmitting}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Quiz"} 
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={
                          currentQuestionIndex === quiz.questions.length - 1
                        }
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md disabled:opacity-50"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {timeUpMessage && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center">
              Time's up! Your quiz has been submitted.
            </div>
          )}

          {/* Quiz Submission and Results */}
          {quizSubmitted && !viewResults && (
            <div className="space-y-8 ">
              <h3 className="text-2xl font-bold text-gray-800 pt-8">
                Quiz Completed!
              </h3>
              <p className="text-lg text-gray-700">
                Your total score is: {totalMarks} /{" "}
                {quiz.questions.reduce((acc, q) => acc + q.marks, 0)}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleViewResults}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold text-lg rounded-md shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  View Results
                </button>
                <button
                  onClick={handleTryAgain}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-lg rounded-md shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {viewResults && (
            <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Detailed Results
              </h3>
              <div className="space-y-6">
                {quiz.questions.map((question, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-200 pb-6 last:border-b-0 transition-all hover:bg-gray-50 rounded-lg p-4"
                  >
                    <p className="text-xl font-semibold text-gray-800 mb-2">
                      {question.questionText}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <span className="font-medium">Correct Answer:</span>{" "}
                        <span className="text-green-600">
                          {question.correctAnswer}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Your Answer:</span>{" "}
                        <span
                          className={
                            userAnswers[idx] === question.correctAnswer
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {userAnswers[idx] || "No Answer"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Marks:{" "}
                      <span className="font-medium">{question.marks}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800">
                  Total Marks:{" "}
                  <span className="text-blue-600">{totalMarks}</span>
                </p>

                <div>
                  <Link to={"/user/all-quizes"}>
                    <button className="px-4 border-black border py-2 mt-4 rounded-md text-md font-semibold text-gray-800">
                      Back to Quizzes
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizContent;
