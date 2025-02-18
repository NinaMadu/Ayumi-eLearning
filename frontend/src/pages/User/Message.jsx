import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Messaging = ({ instructor }) => {
    const [searchText, setSearchText] = useState('');
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);
    console.log(instructor);
    const recipientId = instructor?._id;

    useEffect(() => {
        console.log("Instructor Data:", instructor);  // Check course data here
        if (!instructor?._id) {
            console.warn("Instructor information is missing in the course object.");
        }
    }, [instructor]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentUser || !recipientId) {
                console.log("Current user:", currentUser._id);
                console.log("Recipient ID:", recipientId);
                console.warn("Missing user or recipient ID.");
                return;
            }
            console.log("Fetching messages for:", currentUser._id, "→", recipientId);
            
            try {
                const response = await axios.get(`${API_BASE_URL}/api/message/conversation/${currentUser._id}/${recipientId}`);
                console.log("API Response:", response.data);
                
                if (response.data.success) {
                    setMessages(response.data.messages);
                } else {
                    console.warn("API returned an unsuccessful response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error.response?.data || error.message);
            }
        };
    
        fetchMessages();
    }, [recipientId, currentUser]);

    useEffect(() => {
        console.log("Updating filteredMessages", messages);
        setFilteredMessages(messages);
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
    
        console.log("Sending message:", newMessage);
    
        try {
            // Assuming the sender and receiver types are 'user' and 'instructor', you can adjust as needed.
            const senderType = 'User'; // Set sender type accordingly
            const receiverType = 'Instructor'; // Set receiver type accordingly
            const fileUrl = null; // Set to file URL if a file is attached, else null
            const imageUrls = []; // Set to an array of image URLs if any images are attached
    
            const response = await axios.post(`${API_BASE_URL}/api/message/`, {
                sender: currentUser._id,
                senderType,
                receiver: recipientId,
                receiverType,
                message: newMessage,
                fileUrl,
                imageUrls,
            });
    
            console.log("Message sent successfully:", response.data);
    
            if (response.data.success) {
                setMessages((prev) => [...prev, response.data.data]); // Assuming the new message data is in response.data.data
                setNewMessage(''); // Clear the message input field
            }
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="container mx-auto shadow-lg rounded-lg">
            <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                <div className="font-semibold text-2xl">Contact Instructor</div>
                <div className="w-1/2">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                    />
                </div>
            </div>

            <div className="flex flex-row justify-between bg-white">
                <div className="w-full px-5 flex flex-col justify-between">
                    <div className="flex flex-col mt-5">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((message) => {
                                const isCurrentUser = message.sender === currentUser._id;
                                return (
                                    <div key={message._id} className="flex flex-col mb-4">
                                        <div className={`flex items-center ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                            
                                            <div className={`ml-2 max-w-xs break-words ${isCurrentUser ? 'bg-green-400 text-white rounded-tl-xl rounded-tr-3xl rounded-bl-xl p-3' : 'bg-blue-400 text-white rounded-tl-3xl rounded-tr-xl p-3'}`}>
                                                
                                                <div>{message.message}</div>
                                            </div>
                                           
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
    );
};

export default Messaging;
