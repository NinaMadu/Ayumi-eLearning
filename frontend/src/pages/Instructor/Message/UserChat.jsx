import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Messaging from '../../User/Message.jsx';
import AdminLayout from '../../../components/AdminLayout.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserChat = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [users, setUsers] = useState({});

    // Fetch all conversations for the current user
    useEffect(() => {
        const fetchConversations = async () => {
          if (!currentUser?._id) {
            console.warn('Current user not available');
            return;
          }
      
          try {
            const response = await axios.get(`${API_BASE_URL}/api/message/instructor/${currentUser._id}`);
            if (response.data.success) {
              const fetchedConversations = response.data.conversations;
              console.log('Fetched Conversations:', fetchedConversations);
              const conversationsArray = [];
      
              // Flatten the conversations by conversationId
              Object.keys(fetchedConversations).forEach(conversationId => {
                const messages = fetchedConversations[conversationId];
                const latestMessage = messages[messages.length - 1];
                console.log(latestMessage) // Get the most recent message
                const instructor = messages[0]?.receiver === currentUser._id
                  ? messages[0]?.sender
                  : messages[0]?.receiver; // Get instructor based on the first message
      
                // Push conversation and user details
                conversationsArray.push({
                  conversationId,
                  messages,
                  latestMessage,
                  instructor
                });
              });
      
              setConversations(conversationsArray);
      
              // Fetch user details for each instructor
              const userPromises = conversationsArray.map(async (conversation) => {
                console.log('Fetching user details for:', conversation.instructor);
                const userId = conversation.instructor;
                if (!users[userId]) { // If user details are not already fetched
                  const userResponse = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
                  return { [userId]: userResponse.data.user }; // Store user data
                }
                return null;
              });
      
              // Resolve user requests
              const userDetails = await Promise.all(userPromises);
              const newUserDetails = {};
              userDetails.forEach((userData) => {
                if (userData) {
                  newUserDetails[Object.keys(userData)[0]] = Object.values(userData)[0];
                }
              });

              console.log('New user details to be added:', newUserDetails);
      
              setUsers((prevUsers) => ({ ...prevUsers, ...newUserDetails }));
            } else {
              console.warn('Failed to fetch conversations:', response.data);
            }
          } catch (error) {
            console.error('Error fetching conversations:', error);
          }
        };
      
        fetchConversations();
      }, [currentUser]);  // Only include currentUser as a dependency
      

  return (
    <AdminLayout>
      <div className="flex h-screen">
        {/* Left Side - Chat List */}
        <div className="w-1/4 bg-gray-100 p-5">
          <h2 className="text-2xl font-semibold mb-5">Conversations</h2>
          <div className="space-y-4">
            {conversations.length > 0 ? (
              conversations.map((conversation) => {
                const userId = conversation.instructor; // Directly use the instructor ID

                const user = users[userId]; // Get the user details from the users state

                return (
                  <div
                    key={conversation.conversationId}
                    className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg"
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{user?.firstName}</div>
                        <div className="text-sm text-gray-600">
                {conversation.latestMessage ? conversation.latestMessage.message : "No message yet"}
              </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No conversations yet.</p>
            )}
          </div>
        </div>

        {/* Right Side - Selected Conversation */}
        <div className="w-3/4 p-5">
          {selectedConversation ? (
            <Messaging user={selectedConversation.instructor} messages={selectedConversation.messages} />
          ) : (
            <div className="flex items-center justify-center h-full text-xl text-gray-500">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserChat;
