import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you're using auth middleware and storing user info in req.user

    const notifications = await Notification.find({ user: userId })
      .populate("course", "title") // get course title
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};
