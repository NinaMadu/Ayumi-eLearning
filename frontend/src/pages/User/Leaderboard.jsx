import React, { useEffect, useState } from "react";
import { Trophy, Crown, User } from "lucide-react";
import UserLayout from "../../components/UserLayout";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/quiz-attempts/leaderboard`
        );
        const data = await response.json();
        setLeaderboard(data.leaderboard);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 flex items-center justify-center">
              Performance Leaderboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Ranking based on average quiz scores
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-base font-medium text-gray-700">
                Top Participants
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry._id || `${entry.userId}-${index}`}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0 mr-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          index === 0
                            ? "bg-yellow-100 border-yellow-200"
                            : index === 1
                            ? "bg-gray-100 border-gray-200"
                            : index === 2
                            ? "bg-amber-100 border-amber-200"
                            : "bg-blue-50 border-blue-100"
                        }`}
                      >
                        {index < 3 ? (
                          <div className="flex flex-col items-center">
                            <Crown
                              className={`w-4 h-4 mb-1 ${
                                index === 0
                                  ? "text-yellow-600"
                                  : index === 1
                                  ? "text-gray-600"
                                  : "text-amber-700"
                              }`}
                            />
                            <span
                              className={`text-xs font-semibold ${
                                index === 0
                                  ? "text-yellow-700"
                                  : index === 1
                                  ? "text-gray-700"
                                  : "text-amber-800"
                              }`}
                            >
                              {index + 1}
                              {index === 0 ? "st" : index === 1 ? "nd" : "rd"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-gray-600">
                              {index + 1}
                            </span>
                            <span className="text-[10px] text-gray-500 mt-[-2px]">
                              rank
                            </span>
                          </div>
                        )}
                      </div>
                      {index < 3 && (
                        <div
                          className={`absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs ${
                            index === 0
                              ? "bg-yellow-500 text-white"
                              : index === 1
                              ? "bg-gray-500 text-white"
                              : "bg-amber-600 text-white"
                          }`}
                        >
                          {index === 0 ? "★" : index === 1 ? "★" : "★"}
                        </div>
                      )}
                    </div>
                    <h3 className="text-base font-medium text-gray-900">
                          {entry.firstName} {entry.lastName}
                        </h3>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        
                        <p className="text-sm text-gray-500 mt-1">
                          {entry.totalQuizzesAttempted} quizzes attempted
                        </p>
                      </div>
                      <span className="text-lg font-semibold text-blue-800">
                        {entry.averageScore.toFixed(1)}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-200 transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              (entry.averageScore /
                                (leaderboard[0]?.averageScore || 1)) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-center text-sm text-gray-500">
                Updated automatically • Sorted by average score
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Leaderboard;
