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
      {
        $group: {
          _id: "$userId",
          totalScore: { $max: "$score" }, // Get the highest score for each user
        },
      },
      {
        $sort: { totalScore: -1 }, // Highest scores first
      },
      {
        $lookup: {
          from: "users", // Collection name in MongoDB
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Flatten the userDetails array
      },
      {
        $project: {
          _id: 0,
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          totalScore: 1,
        },
      },
      {
        $limit: 10, // Top 10 students
      },
    ]);

    res.status(200).json({ message: "Leaderboard retrieved successfully", leaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving leaderboard", error: error.message });
  }
};
