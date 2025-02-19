const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  conversationId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  participants: [
    {
      participantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      participantType: {
        type: String,
        enum: ['User', 'Instructor'], // Identify participant type
        required: true
      }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', conversationSchema);
