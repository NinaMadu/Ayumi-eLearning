import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Discussion = ({ courseId }) => {
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/discussion/${courseId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [courseId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        sender: 'You',
        senderImg: 'https://source.unsplash.com/random/600x600',
      };
      try {
        const response = await axios.post(`/api/discussions/${courseId}`, messageData);
        setMessages([...messages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleReaction = async (messageId, reactionType) => {
    try {
      await axios.post(`/api/discussions/${courseId}/${messageId}/react`, { reactionType });
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId
            ? { ...message, reactions: { ...message.reactions, [reactionType]: message.reactions[reactionType] + 1 } }
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
              placeholder="search favorite courses..."
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
              {messages.map((message) => (
                <div key={message.id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img src={message.senderImg} className="object-cover h-8 w-8 rounded-full" alt="Sender" />
                    <div className="ml-2">
                      <div className="text-lg font-semibold">{message.sender}</div>
                      <div className="bg-blue-400 rounded-tl-3xl rounded-tr-xl py-3 px-4 text-white">
                        {message.text}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <button onClick={() => handleReaction(message.id, 'like')} className="text-blue-500">
                      👍 {message.reactions?.like || 0}
                    </button>
                    <button onClick={() => handleReaction(message.id, 'dislike')} className="text-red-500">
                      👎 {message.reactions?.dislike || 0}
                    </button>
                  </div>
                </div>
              ))}
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
