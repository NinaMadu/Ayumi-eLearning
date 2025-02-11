import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../../../components/AdminLayout";

const CreateQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/quiz`
        );
        const data = await res.json();

        if (res.ok) {
          setQuizzes(data.quizzes);
        } else {
          setError(data.message || "Failed to fetch quizzes");
        }
      } catch (err) {
        setError("Error fetching quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading quizzes...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <p>{error}</p>
      </AdminLayout>
    );
  }

  const handleDelete = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quiz/${quizId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
          alert('Quiz deleted successfully');
        } else {
          const data = await res.json();
          alert(data.message || 'Failed to delete quiz');
        }
      } catch (error) {
        alert('Error deleting quiz');
      }
    }
  };

  return (
    <AdminLayout>
      {/* Add New Quiz Button */}
      <div className="flex justify-end p-4">
        <Link to="/instructor/quiz-first">
          <button
            className="py-2 px-6 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(to right, #D16262, #C53B3B)",
            }}
          >
            + Add New Quiz
          </button>
        </Link>
      </div>

      {/* Quizzes List */}
      <div className="container mx-auto p-4 space-y-4 bg-slate-50 rounded-lg">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-transform hover:scale-105"
            >
              {/* Quiz Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {quiz.quizTitle}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Category:</strong> {quiz.category}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Difficulty:</strong> {quiz.difficulty}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Duration:</strong> {quiz.duration} minutes
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                  className="text-blue-800 hover:text-blue-600"
                  onClick={() => navigate(`/instructor/edit-quiz-first/${quiz._id}`)}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-red-700 hover:text-red-500"
                  onClick={() => {handleDelete(quiz._id)}}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No quizzes found!</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default CreateQuiz;
