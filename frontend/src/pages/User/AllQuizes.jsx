import React, { useState, useEffect } from "react";
import UserLayout from "../../components/UserLayout";

function AllQuizes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quizzes from API
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

  // Group quizzes by difficulty level
  const groupByDifficulty = (quizzes) => {
    return quizzes.reduce((acc, quiz) => {
      acc[quiz.difficulty] = acc[quiz.difficulty] || [];
      acc[quiz.difficulty].push(quiz);
      return acc;
    }, {});
  };

  const groupedQuizzes = groupByDifficulty(quizzes);

  // Loading and Error States
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <UserLayout>
        <div className="container mx-auto p-4">
          {Object.keys(groupedQuizzes).length > 0 ? (
            Object.entries(groupedQuizzes).map(([difficulty, quizzes]) => (
              <DifficultySection key={difficulty} difficulty={difficulty} quizzes={quizzes} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No quizzes found!</p>
          )}
        </div>
      </UserLayout>
    </div>
  );
}

// Component for Difficulty Sections
const DifficultySection = ({ difficulty, quizzes }) => {
  const difficultyStyles = {
    Easy: "bg-green-50 text-green-700 border-green-300",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-300",
    Hard: "bg-red-50 text-red-700 border-red-300",
  };

  return (
    <div className="mb-10">
      <h2
  className={`text-xl font-semibold py-3 px-4 rounded border text-center ${
    difficultyStyles[difficulty] || "bg-gray-10 text-gray-700 border-gray-100"
  }`}
>
  {difficulty} Level Quizzes
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

// Quiz Card Component
const QuizCard = ({ quiz }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{quiz.quizTitle}</h3>
      <p className="text-sm text-gray-500 mb-1">
        <strong>Category:</strong> {quiz.category}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Duration:</strong> {quiz.duration} minutes
      </p>
      <button className="bg-blue-700 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200">
        Start Quiz
      </button>
    </div>
  </div>
);

export default AllQuizes;
