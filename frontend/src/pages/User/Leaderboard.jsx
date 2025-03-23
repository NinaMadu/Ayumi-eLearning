import React, { useEffect, useState } from "react";
import { Trophy, Crown, Sparkles, UserCircle } from "lucide-react";
import UserLayout from "../../components/UserLayout";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/quiz-attempts/leaderboard"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent inline-block">
            <Trophy className="inline-block w-8 h-8 mr-3 -mt-1 text-yellow-500" />
            Quiz Champions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            See where you stand among our top performers
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center">
            <Sparkles className="w-6 h-6 text-white mr-2" />
            <h2 className="text-xl font-semibold text-white">
              Top {leaderboard.length} Participants
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry._id} 
                className="p-4 hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="relative w-12 flex-shrink-0">
                    <div className={`absolute -left-2 -top-2 ${index < 3 ? "opacity-100" : "opacity-0"}`}>
                      {index === 0 && (
                        <Crown className="w-6 h-6 text-yellow-500 fill-yellow-400/20" />
                      )}
                      {index === 1 && (
                        <Crown className="w-6 h-6 text-gray-400 fill-gray-400/20" />
                      )}
                      {index === 2 && (
                        <Crown className="w-6 h-6 text-amber-700 fill-amber-700/20" />
                      )}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                      ${index === 0 ? "bg-yellow-500/20 text-yellow-700" : 
                        index === 1 ? "bg-gray-400/20 text-gray-600" : 
                        index === 2 ? "bg-amber-700/20 text-amber-800" : 
                        "bg-blue-100 text-blue-600"}`}
                    >
                      {entry.firstName[0]}{entry.lastName[0]}
                    </div>
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {entry.firstName} {entry.lastName}
                        {index < 3 && (
                          <span className="ml-2 text-sm bg-gradient-to-r from-purple-100 to-blue-100 px-2 py-1 rounded-full">
                            #{index + 1} Rank
                          </span>
                        )}
                      </h3>
                      <span className="text-lg font-bold text-blue-600">
                        {entry.totalScore} pts
                      </span>
                    </div>
                    
                    <div className="mt-2 relative">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${index === 0 ? "bg-yellow-400" : "bg-blue-400"} transition-all duration-500`}
                          style={{ 
                            width: `${(entry.totalScore / leaderboard[0]?.totalScore) * 100 || 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="text-center text-sm text-gray-500">
              Updated in real-time • Refresh to see latest results
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
    </UserLayout>
  );
  
};

export default Leaderboard;