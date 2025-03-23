import QuizAttempt from "../models/quizAttempt.model.js";

export const submitQuiz = async (req, res) => {
  try {
    const { userId, quizId, score } = req.body;

    if (!userId || !quizId || score === undefined) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newAttempt = new QuizAttempt({
      userId,
      quizId,
      score,
    });

    await newAttempt.save();

    res.status(201).json({ message: "Quiz result saved successfully!", attempt: newAttempt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting quiz result", error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await QuizAttempt.aggregate([
      // First group by user and quiz to get max score per quiz
      {
        $group: {
          _id: {
            userId: "$userId",
            quizId: "$quizId"
          },
          maxScore: { $max: "$score" }
        }
      },
      // Lookup quiz details after initial grouping
      {
        $lookup: {
          from: "quizzes",
          localField: "_id.quizId",
          foreignField: "_id",
          as: "quiz"
        }
      },
      { $unwind: "$quiz" },
      // Add difficulty weighting
      {
        $addFields: {
          numericScore: {
            $cond: [
              { $eq: [{ $type: "$maxScore" }, "string"] },
              { $toDouble: "$maxScore" },
              { $convert: { input: "$maxScore", to: "double", onError: 0 } }
            ]
          },
          weight: {
            $switch: {
              branches: [
                { case: { $eq: ["$quiz.difficultyLevel", "easy"] }, then: 1 },
                { case: { $eq: ["$quiz.difficultyLevel", "medium"] }, then: 1.5 },
                { case: { $eq: ["$quiz.difficultyLevel", "hard"] }, then: 2 }
              ],
              default: 1
            }
          }
        }
      },
      {
        $addFields: {
          weightedScore: { $multiply: ["$numericScore", "$weight"] }
        }
      },
      // Now group by user to calculate totals
      {
        $group: {
          _id: "$_id.userId",
          totalWeightedScore: { $sum: "$weightedScore" },
          totalQuizzesAttempted: { $sum: 1 },
          averageScore: { $avg: "$weightedScore" }
        }
      },
      // Rest of the pipeline remains the same
      {
        $project: {
          _id: 0,
          userId: "$_id",
          averageScore: {
            $ifNull: [
              { $round: ["$averageScore", 2] },
              0
            ]
          },
          totalWeightedScore: 1,
          totalQuizzesAttempted: 1
        }
      },
      { $sort: { averageScore: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          averageScore: 1,
          totalQuizzesAttempted: 1,
          totalWeightedScore: 1
        }
      }
    ]);

    res.status(200).json({ 
      message: "Leaderboard retrieved successfully", 
      leaderboard 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error retrieving leaderboard", 
      error: error.message 
    });
  }
};