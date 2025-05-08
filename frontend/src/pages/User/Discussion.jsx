import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/UserLayout';
import { useSelector } from 'react-redux';

const Discussion = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to group everyone!',
      reactions: { like: 0, dislike: 0 },
      sender: 'John Doe',
      senderImg: 'https://source.unsplash.com/vpOeXr5wmR4/600x600',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: newMessage,
          reactions: { like: 0, dislike: 0 },
          sender: currentUser._id,
          senderImg: currentUser.avatar, // User avatar or placeholder
        },
      ]);
      setNewMessage('');
    }
  };

  const handleReaction = (messageId, reactionType) => {
    const updatedMessages = messages.map((message) =>
      message.id === messageId
        ? {
            ...message,
            reactions: {
              ...message.reactions,
              [reactionType]: message.reactions[reactionType] + 1,
            },
          }
        : message
    );
    setMessages(updatedMessages);
  };

  return (
    <div>
      <UserLayout>
        <div className="container mx-auto shadow-lg rounded-lg">
          {/* Header */}
          <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">Discussion</div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="search favorite courses..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value); // Update input text
                }}
                className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
              />
            </div>
            <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
              RA
            </div>
          </div>
          {/* End Header */}

          {/* Chatting and Courses Grid */}
          <div className="flex flex-row justify-between bg-white">
            {/* Message Section */}
            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5">
                {/* Display Messages */}
                {messages.map((message) => (
                  <div key={message.id} className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <img
                        src={message.senderImg}
                        className="object-cover h-8 w-8 rounded-full"
                        alt="Sender"
                      />
                      <div className="ml-2">
                        <div className="text-lg font-semibold">{message.sender}</div>
                        <div className="bg-blue-400 rounded-tl-3xl rounded-tr-xl py-3 px-4 text-white">
                          {message.text}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <button
                        onClick={() => handleReaction(message.id, 'like')}
                        className="text-blue-500"
                      >
                        👍 {message.reactions.like}
                      </button>
                      <button
                        onClick={() => handleReaction(message.id, 'dislike')}
                        className="text-red-500"
                      >
                        👎 {message.reactions.dislike}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="py-5 flex items-center">
                <input
                  className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 py-3 px-4 bg-green-500 rounded-xl text-white font-semibold"
                >
                  Send
                </button>
              </div>
            </div>
            {/* End Message Section */}
          </div>
          {/* End Chatting */}
        </div>
      </UserLayout>
    </div>
  );
};

export default Discussion;
