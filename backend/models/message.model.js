import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  senderType: {
    type: String,
    enum: ['User', 'Instructor'], // To differentiate sender type
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  receiverType: {
    type: String,
    enum: ['User', 'Instructor'], // To differentiate receiver type
    required: true
  },
  message: { 
    type: String, 
    default: "" 
  },
  fileUrl: { 
    type: String, 
    default: null 
  },
  imageUrls: [{ 
    type: String 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Message', messageSchema);

