import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Discussion = ({ courseId, currentUserId }) => {
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/discussion/${courseId}`);

        if (response.data.success && Array.isArray(response.data.messages)) {
          setMessages(response.data.messages);
        } else {
          setMessages([]);
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [courseId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        userId: currentUser._id,  // Ensure userId is the current user
        courseId: courseId,     // Pass the courseId
        message: newMessage,    // The message text
      };

      //console.log('Sending message:', messageData);
  
      try {
        const response = await axios.post(`${API_BASE_URL}/api/discussion/`, messageData);
  
        if (response.data && response.data.success) {
          setMessages([...messages, response.data.newMessage]);  // Assuming the backend returns the saved message as newMessage
        }
  
        setNewMessage('');  // Clear the input after sending the message
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  

  const handleReaction = async (messageId, reactionType) => {
    try {
      await axios.post(`/api/discussion/${courseId}/${messageId}/react`, { reactionType });

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === messageId
            ? {
                ...message,
                reactions: {
                  ...message.reactions,
                  [reactionType]: (message.reactions?.[reactionType] || 0) + 1,
                },
              }
            : message
        )
      );
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
  };

  return (
    <div>
      <div className="container mx-auto shadow-lg rounded-lg">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">Discussion</div>
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
            />
          </div>
          <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
            RA
          </div>
        </div>

        <div className="flex flex-row justify-between bg-white">
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              {messages.length > 0 ? (
                messages.map((message) => {
                    console.log(currentUser);
                  const isCurrentUser = message.user._id === currentUser._id;
                  return (
                    <div
                      key={message._id}
                      className={`flex items-center mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isCurrentUser && (
                        <img src={message.user.avatar} className="object-cover h-8 w-8 rounded-full" alt="Sender" />
                      )}
                      <div
                        className={`ml-2 max-w-xs break-words ${
                          isCurrentUser
                            ? 'bg-green-400 text-white rounded-tl-xl rounded-tr-3xl rounded-bl-xl p-3'
                            : 'bg-blue-400 text-white rounded-tl-3xl rounded-tr-xl p-3'
                        }`}
                      >
                        <div className="text-sm font-semibold">{message.user.firstName}</div>
                        <div>{message.message}</div>
                      </div>
                      {isCurrentUser && (
                        <img src={message.user.avatar} className="object-cover h-8 w-8 rounded-full" alt="Sender" />
                      )}
                      <div className="flex space-x-2 items-center">
                        <button onClick={() => handleReaction(message._id, 'like')} className="text-blue-500">
                          👍 {message.reactions?.like || 0}
                        </button>
                        <button onClick={() => handleReaction(message._id, 'dislike')} className="text-red-500">
                          👎 {message.reactions?.dislike || 0}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 mt-5">No messages yet.</p>
              )}
            </div>

            <div className="py-5 flex items-center">
              <input
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage} className="ml-2 py-3 px-4 bg-green-500 rounded-xl text-white font-semibold">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
