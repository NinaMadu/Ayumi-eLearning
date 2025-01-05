import React, { useEffect, useState } from "react";
import Sidemenu from "../../components/Sidemenu";
import Header from "../../components/Header";
import UserLayout from "../../components/UserLayout";

function AllQuizes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quiz`);
        const data = await response.json();

        if (response.ok) {
          setQuizzes(data.quizzes || []);
        } else {
          throw new Error(data.message || "Failed to fetch quizzes");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <Sidemenu />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <Sidemenu />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserLayout>
        <div className="container mx-auto p-4 space-y-4 bg-slate-50 rounded-lg relative">
          {quizzes.length > 0 ? (
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative flex-1 p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">{quiz.quizTitle}</h3>
                    <div className="text-sm text-gray-600 mt-2">
                      <p>
                        <strong>Category:</strong> {quiz.category}
                      </p>
                      <p>
                        <strong>Difficulty:</strong> {quiz.difficulty}
                      </p>
                      <p>
                        <strong>Duration:</strong> {quiz.duration} minutes
                      </p>
                    </div>
                    <div className="absolute top-1/2 right-10 transform -translate-y-1/2 flex gap-4">
                      
                      <button className="bg-blue-800 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">No quizzes found!</p>
          )}
        </div>
      </UserLayout>
    </div>
  );
}

export default AllQuizes;
