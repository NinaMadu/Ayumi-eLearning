import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuizContent = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!quizId) {
      setError("Quiz ID is missing in the URL");
      setLoading(false);
      return;
    }

    const fetchQuizData = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/quiz/${quizId}`);
        setQuiz(data.quiz); // Adjust based on API response
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  return (
    <div className="max-w-4xl mx-auto p-4 mb-8">
         <Header />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {quiz && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Quiz Header */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 pt-16">{quiz.quizTitle}</h1>
            <p className="text-gray-600 pt-6">{quiz.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <p>
                <strong>Category:</strong> {quiz.category}
              </p>
              <p>
                <strong>Difficulty:</strong> {quiz.difficulty}
              </p>
              <p>
                <strong>Duration:</strong> {quiz.duration} minutes
              </p>
              <p>
                <strong>Total Marks:</strong> {quiz.totalMarks}
              </p>
              <p>
                <strong>Passing Score:</strong> {quiz.passingScore}
              </p>
            </div>
          </div>

          {/* Questions Section */}
          <div>
            {quiz.questions.map((question, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Question {index + 1}: {question.questionText}
                </h2>
                {question.questionType === "multipleChoice" && (
                  <ul className="space-y-2">
                    {question.answers.map((answer, idx) => (
                      <li key={idx} className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          id={`question-${index}-answer-${idx}`}
                          className="mr-2"
                        />
                        <label htmlFor={`question-${index}-answer-${idx}`}>
                          {answer}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                {question.questionType === "trueFalse" && (
                  <ul className="space-y-2">
                    <li>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        id={`question-${index}-true`}
                        className="mr-2"
                      />
                      <label htmlFor={`question-${index}-true`}>True</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        id={`question-${index}-false`}
                        className="mr-2"
                      />
                      <label htmlFor={`question-${index}-false`}>False</label>
                    </li>
                  </ul>
                )}
                {question.questionType === "shortAnswer" && (
                  <div>
                    <textarea
                      name={`question-${index}`}
                      className="w-full border rounded p-2"
                      placeholder="Write your answer here..."
                    ></textarea>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Marks:</strong> {question.marks}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContent;
