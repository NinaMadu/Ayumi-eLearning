import mongoose from "mongoose";
import Message from "../models/message.model.js";

// Generate a unique conversation ID based on sender and receiver
const generateConversationId = (sender, receiver) => {
  return [sender.toString(), receiver.toString()].sort().join('_');
};

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { sender, senderType, receiver, receiverType, message, fileUrl, imageUrls } = req.body;

    const conversationId = generateConversationId(sender, receiver);

    const newMessage = new Message({
      conversationId,
      sender,
      senderType,
      receiver,
      receiverType,
      message,
      fileUrl: fileUrl || null,
      imageUrls: imageUrls || [],
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: "Message sent successfully!", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Messages by User (Organized as Conversations)
export const getMessagesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: -1 });

    // Organize messages into conversation groups
    const conversations = {};
    messages.forEach((msg) => {
      const convoId = msg.conversationId;
      if (!conversations[convoId]) conversations[convoId] = [];
      conversations[convoId].push(msg);
    });

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error("Error fetching messages by user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Messages by Instructor (Organized as Conversations)
export const getMessagesByInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const messages = await Message.find({
      $or: [{ sender: instructorId }, { receiver: instructorId }],
    }).sort({ createdAt: -1 });

    // Organize messages into conversation groups
    const conversations = {};
    messages.forEach((msg) => {
      const convoId = msg.conversationId;
      if (!conversations[convoId]) conversations[convoId] = [];
      conversations[convoId].push(msg);
    });

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error("Error fetching messages by instructor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a Single Message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) return res.status(404).json({ success: false, message: "Message not found" });

    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a Conversation
export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const deleted = await Message.deleteMany({ conversationId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "No conversation found" });
    }

    res.status(200).json({ success: true, message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
