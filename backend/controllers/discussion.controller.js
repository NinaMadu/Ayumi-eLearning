import Discussion from "../models/discussion.model.js";

// Send a new message
export const sendMessage = async (req, res) => {
    try {
      const { userId, courseId, message } = req.body; // Extract userId from the request body
  
      const newMessage = new Discussion({
        user: userId,
        course: courseId,
        message,
      });
  
      await newMessage.save();
      res.status(201).json({ success: true, message: "Message sent", newMessage });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
    }
  };
  

// Get all messages in a course
export const getMessagesByCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      const messages = await Discussion.find({ course: courseId })
        .populate("user", "firstName email avatar")
        .populate("replies.user", "firstName email avatar")
        .sort({ createdAt: 1 });
  
      res.status(200).json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch messages", error: error.message });
    }
  };
  

// Reply to a message
export const replyToMessage = async (req, res) => {
    try {
      const { messageId } = req.params;
      const { userId, message } = req.body; // Extract userId from the request body
  
      const updatedMessage = await Discussion.findByIdAndUpdate(
        messageId,
        {
          $push: { replies: { user: userId, message } },
        },
        { new: true }
      ).populate("replies.user", "firstName email avatar");
  
      if (!updatedMessage) {
        return res.status(404).json({ success: false, message: "Message not found" });
      }
  
      res.status(200).json({ success: true, message: "Reply added", updatedMessage });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to reply", error: error.message });
    }
  };
  

// Like/Dislike a message
export const toggleLikeDislike = async (req, res) => {
    try {
      const { messageId } = req.params;
      const { action, userId } = req.body; // Extract userId from the request body
  
      const message = await Discussion.findById(messageId);
      if (!message) return res.status(404).json({ success: false, message: "Message not found" });
  
      if (action === "like") {
        // Remove from dislikes if already disliked
        message.dislikes = message.dislikes.filter(id => id.toString() !== userId);
        if (!message.likes.includes(userId)) {
          message.likes.push(userId);
        } else {
          message.likes = message.likes.filter(id => id.toString() !== userId); // Toggle off like
        }
      } else if (action === "dislike") {
        // Remove from likes if already liked
        message.likes = message.likes.filter(id => id.toString() !== userId);
        if (!message.dislikes.includes(userId)) {
          message.dislikes.push(userId);
        } else {
          message.dislikes = message.dislikes.filter(id => id.toString() !== userId); // Toggle off dislike
        }
      }
  
      await message.save();
      res.status(200).json({ success: true, message: "Action applied", updatedMessage: message });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to apply action", error: error.message });
    }
  };
  
